import { MercadoPagoConfig, Payment } from "mercadopago";
import db from "../database/db.js";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
const payment = new Payment(client);

const formatarItens = (itens) => {
  const categoriasComPrefixo = ["BIG", "Baby"];
  return itens
    .map((item) => {
      const prefixo = categoriasComPrefixo.includes(item.categoria)
        ? `${item.categoria} `
        : "";
      return `${item.quantidade}x ${prefixo}${item.nomeProduto}`;
    })
    .join(", ");
};

export const processarPagamento = async (req, res) => {
  const {
    metodo,
    nomeCliente,
    email,
    cpf,
    telefone,
    itens,
    valorTotal,
    observacoes,
    // campos exclusivos do cartão
    token,
    installments,
    payment_method_id,
    issuer_id,
  } = req.body;

 
  if (!nomeCliente?.trim())
    return res.status(400).json({ error: "Nome do cliente é obrigatório." });
  if (!email?.trim())
    return res.status(400).json({ error: "E-mail é obrigatório." });
  if (!cpf?.trim())
    return res.status(400).json({ error: "CPF é obrigatório." });
  if (!Array.isArray(itens) || itens.length === 0)
    return res.status(400).json({ error: "O pedido precisa ter ao menos um item." });
  if (typeof valorTotal !== "number" || valorTotal <= 0)
    return res.status(400).json({ error: "Valor total inválido." });

  const descricao = formatarItens(itens);

  const pedido = db
    .prepare(
      `INSERT INTO Pedidos
        (NomeCliente, NomeProdutoPedido, ValorFinalPedido, Observacoes, StatusPagamento, MetodoPagamento)
       VALUES (?, ?, ?, ?, 'pendente', ?)`
    )
    .run(
      nomeCliente.trim(),
      descricao,
      valorTotal,
      observacoes?.trim() || null,
      metodo
    );

  const idPedido = pedido.lastInsertRowid;

  try {
    const bodyBase = {
      transaction_amount: valorTotal,
      description: `Pedido #${idPedido} - Big Gula`,
      payer: {
        email: email.trim(),
        first_name: nomeCliente.trim(),
        identification: {
          type: "CPF",
          number: cpf.replace(/\D/g, ""),
        },
      },
    };

    let bodyPagamento;

    if (metodo === "pix") {
      bodyPagamento = { ...bodyBase, payment_method_id: "pix" };
    } else {
      bodyPagamento = {
        ...bodyBase,
        token,
        installments: Number(installments) || 1,
        payment_method_id,
        issuer_id,
      };
    }

    const resultado = await payment.create({
      body: bodyPagamento,
      requestOptions: {
        idempotencyKey: `pedido-${idPedido}-${Date.now()}`,
      },
    });

    db.prepare(
      `UPDATE Pedidos SET StatusPagamento = ?, MpPaymentId = ? WHERE idPedido = ?`
    ).run(resultado.status, String(resultado.id), idPedido);

    // 5. Retornar resposta conforme método
    if (metodo === "pix") {
      return res.json({
        sucesso: true,
        idPedido,
        mpPaymentId: resultado.id,
        status: resultado.status,
        qr_code:
          resultado.point_of_interaction.transaction_data.qr_code,
        qr_code_base64:
          resultado.point_of_interaction.transaction_data.qr_code_base64,
        nomeCliente: nomeCliente.trim(),
        descricao,
        valorTotal,
      });
    }

    return res.json({
      sucesso: true,
      idPedido,
      mpPaymentId: resultado.id,
      status: resultado.status,
      status_detail: resultado.status_detail,
      nomeCliente: nomeCliente.trim(),
      descricao,
      valorTotal,
    });
  } catch (error) {
    db.prepare(
      `UPDATE Pedidos SET StatusPagamento = 'erro' WHERE idPedido = ?`
    ).run(idPedido);

    console.error("Erro ao processar pagamento MP:", error);
    return res.status(500).json({ error: "Erro ao processar pagamento." });
  }
};

export const webhook = async (req, res) => {
  const { type, data } = req.body;

  if (type === "payment" && data?.id) {
    try {
      const info = await payment.get({ id: data.id });

      db.prepare(
        `UPDATE Pedidos SET StatusPagamento = ? WHERE MpPaymentId = ?`
      ).run(info.status, String(info.id));

      console.log(`Webhook — Pagamento ${info.id}: ${info.status}`);
    } catch (err) {
      console.error("Erro no webhook:", err);
    }
  }

  res.sendStatus(200);
};
