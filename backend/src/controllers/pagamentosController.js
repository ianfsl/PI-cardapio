import { MercadoPagoConfig, Payment } from "mercadopago";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import db from "../database/db.js";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});
const payment = new Payment(client);

const formatarItens = (itens) => {
  return itens
    .map((item) => {
      let linha = `${item.quantidade}x ${item.nomeProduto}`;
      if (item.adicionais && item.adicionais.length > 0) {
        const nomes = item.adicionais.map((a) => a.nomeAdicional).join(", ");
        linha += ` [+ ${nomes}]`;
      }
      return linha;
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
      transaction_amount: parseFloat(Number(valorTotal).toFixed(2)),
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

    console.log("[MP] body:", JSON.stringify({ transaction_amount: bodyBase.transaction_amount, email: bodyBase.payer.email, cpf: bodyBase.payer.identification.number }, null, 2));

    let bodyPagamento;

    if (metodo === "pix") {
      bodyPagamento = { ...bodyBase, payment_method_id: "pix" };
    } else if (metodo === "debito") {
      bodyPagamento = {
        ...bodyBase,
        token,
        installments: 1,
        payment_method_id,
        issuer_id,
        payment_type_id: "debit_card",
      };
    } else {
      bodyPagamento = {
        ...bodyBase,
        token,
        installments: Number(installments) || 1,
        payment_method_id,
        issuer_id,
        payment_type_id: "credit_card",
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

    if (metodo === "pix") {
      return res.json({
        sucesso: true,
        idPedido,
        mpPaymentId: resultado.id,
        status: resultado.status,
        qr_code: resultado.point_of_interaction.transaction_data.qr_code,
        qr_code_base64: resultado.point_of_interaction.transaction_data.qr_code_base64,
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

export const gerarComprovante = async (req, res) => {
  const { idPedido } = req.params;

  const pedido = db
    .prepare("SELECT * FROM Pedidos WHERE idPedido = ?")
    .get(idPedido);

  if (!pedido) {
    return res.status(404).json({ error: "Pedido não encontrado." });
  }

  if (pedido.StatusPagamento !== "approved") {
    return res.status(400).json({
      error: "Comprovante disponível apenas para pagamentos aprovados.",
    });
  }

  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const { width, height } = page.getSize();

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const drawText = (str, x, y, opts = {}) => {
      page.drawText(String(str), {
        x,
        y,
        size: opts.size || 11,
        font: opts.bold ? fontBold : fontRegular,
        color: opts.color || rgb(0.1, 0.1, 0.1),
      });
    };

    const drawLine = (x1, y1, x2, y2, opts = {}) => {
      page.drawLine({
        start: { x: x1, y: y1 },
        end: { x: x2, y: y2 },
        thickness: opts.thickness || 1,
        color: opts.color || rgb(0.85, 0.85, 0.85),
      });
    };

    page.drawRectangle({ x: 0, y: height - 90, width, height: 90, color: rgb(0.91, 0.36, 0.02) });
    drawText("Big Gula", 40, height - 42, { size: 26, bold: true, color: rgb(1, 1, 1) });
    drawText("Comprovante de Pagamento", 40, height - 64, { size: 12, color: rgb(1, 0.95, 0.9) });

    const numStr = `Pedido #${pedido.idPedido}`;
    const numWidth = fontBold.widthOfTextAtSize(numStr, 13);
    drawText(numStr, width - 40 - numWidth, height - 47, { size: 13, bold: true, color: rgb(1, 1, 1) });

    let y = height - 130;
    drawText("DADOS DO CLIENTE", 40, y, { size: 9, bold: true, color: rgb(0.5, 0.5, 0.5) });
    y -= 18;
    drawText(pedido.NomeCliente, 40, y, { size: 13, bold: true });
    y -= 18;

    const dataPedido = new Date(pedido.DataPedido);
    const dataFormatada = dataPedido.toLocaleDateString("pt-BR", {
      day: "2-digit", month: "long", year: "numeric",
    });
    const horaFormatada = dataPedido.toLocaleTimeString("pt-BR", {
      hour: "2-digit", minute: "2-digit",
    });
    drawText(`Realizado em ${dataFormatada} às ${horaFormatada}`, 40, y, {
      size: 10, color: rgb(0.4, 0.4, 0.4),
    });
    y -= 16;

    const metodoLabel =
      pedido.MetodoPagamento === "pix"
        ? "PIX"
        : pedido.MetodoPagamento === "debito"
        ? "Cartão de Débito"
        : "Cartão de Crédito";
    drawText(`Forma de pagamento: ${metodoLabel}`, 40, y, { size: 10, color: rgb(0.4, 0.4, 0.4) });
    y -= 24;

    drawLine(40, y, width - 40, y);
    y -= 20;

    drawText("ITENS DO PEDIDO", 40, y, { size: 9, bold: true, color: rgb(0.5, 0.5, 0.5) });
    y -= 20;

    page.drawRectangle({ x: 40, y: y - 4, width: width - 80, height: 22, color: rgb(0.97, 0.97, 0.97) });
    drawText("Item", 50, y + 3, { size: 10, bold: true, color: rgb(0.3, 0.3, 0.3) });
    drawText("Qtd", width - 130, y + 3, { size: 10, bold: true, color: rgb(0.3, 0.3, 0.3) });
    y -= 24;
    const itensLista = pedido.NomeProdutoPedido
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    itensLista.forEach((itemStr, idx) => {
      const match = itemStr.match(/^(\d+)x\s+(.+)$/);
      const qtd = match ? match[1] : "1";
      const nome = match ? match[2] : itemStr;

      if (idx % 2 === 0) {
        page.drawRectangle({ x: 40, y: y - 5, width: width - 80, height: 20, color: rgb(0.99, 0.99, 0.99) });
      }

      const nomeExibido = nome.length > 55 ? nome.slice(0, 52) + "..." : nome;
      drawText(nomeExibido, 50, y, { size: 10 });
      drawText(qtd, width - 125, y, { size: 10 });
      y -= 22;
    });

    drawLine(40, y + 10, width - 40, y + 10);
    y -= 10;

    const totalStr = `R$ ${Number(pedido.ValorFinalPedido).toFixed(2).replace(".", ",")}`;
    const totalWidth = fontBold.widthOfTextAtSize(totalStr, 16);
    drawText("Total pago", width - 40 - totalWidth - 80, y, { size: 11, color: rgb(0.3, 0.3, 0.3) });
    drawText(totalStr, width - 40 - totalWidth, y, {
      size: 16, bold: true, color: rgb(0.76, 0.27, 0.05),
    });
    y -= 30;

    if (pedido.Observacoes) {
      drawLine(40, y, width - 40, y);
      y -= 20;
      drawText("OBSERVAÇÕES", 40, y, { size: 9, bold: true, color: rgb(0.5, 0.5, 0.5) });
      y -= 16;

      const palavras = pedido.Observacoes.split(" ");
      let buf = "";
      const linhasObs = [];
      palavras.forEach((word) => {
        if ((buf + " " + word).trim().length > 70) {
          linhasObs.push(buf.trim());
          buf = word;
        } else {
          buf = (buf + " " + word).trim();
        }
      });
      if (buf) linhasObs.push(buf);
      linhasObs.forEach((l) => {
        drawText(l, 40, y, { size: 10, color: rgb(0.35, 0.35, 0.35) });
        y -= 16;
      });
    }

    y -= 20;
    page.drawRectangle({ x: 40, y: y - 8, width: width - 80, height: 36, color: rgb(0.94, 1, 0.96) });
    page.drawRectangle({
      x: 40, y: y - 8, width: width - 80, height: 36,
      borderColor: rgb(0.22, 0.7, 0.44), borderWidth: 1,
    });
    drawText("Pagamento aprovado pelo MercadoPago", 52, y + 6, {
      size: 11, bold: true, color: rgb(0.1, 0.5, 0.25),
    });
    if (pedido.MpPaymentId) {
      const mpStr = `ID MP: ${pedido.MpPaymentId}`;
      const mpW = fontRegular.widthOfTextAtSize(mpStr, 9);
      drawText(mpStr, width - 50 - mpW, y + 8, { size: 9, color: rgb(0.4, 0.4, 0.4) });
    }

    drawLine(40, 60, width - 40, 60, { color: rgb(0.9, 0.9, 0.9) });
    drawText("Big Gula — Sistema de Pedidos", 40, 42, { size: 9, color: rgb(0.6, 0.6, 0.6) });
    const rodape = "Documento gerado automaticamente";
    const rodapeW = fontRegular.widthOfTextAtSize(rodape, 9);
    drawText(rodape, width - 40 - rodapeW, 42, { size: 9, color: rgb(0.6, 0.6, 0.6) });

    const pdfBytes = await pdfDoc.save();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="comprovante-pedido-${pedido.idPedido}.pdf"`);
    res.setHeader("Content-Length", pdfBytes.length);
    return res.end(Buffer.from(pdfBytes));
  } catch (err) {
    console.error("Erro ao gerar comprovante:", err);
    return res.status(500).json({ error: "Erro ao gerar comprovante." });
  }
};