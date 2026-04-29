import db from "../database/db.js";

// Função auxiliar pra montar a string descritiva do pedido
// a partir do array de itens do carrinho
const formatarItens = (itens) => {
  return itens
    .map((item) => `${item.quantidade}x ${item.nomeProduto}`)
    .join(", ");
};

export const listarPedidos = (req, res) => {
  try {
    const pedidos = db
      .prepare("SELECT * FROM Pedidos ORDER BY idPedido DESC")
      .all();
    res.json(pedidos);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ error: "Erro ao buscar pedidos." });
  }
};

export const buscarPedidoPorId = (req, res) => {
  try {
    const { id } = req.params;
    const pedido = db
      .prepare("SELECT * FROM Pedidos WHERE idPedido = ?")
      .get(id);
    if (!pedido)
      return res.status(404).json({ error: "Pedido não encontrado." });
    res.json(pedido);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res.status(500).json({ error: "Erro ao buscar pedido." });
  }
};

export const criarPedido = (req, res) => {
  try {
    const { nomeCliente, itens, valorTotal, observacoes } = req.body;

    if (!nomeCliente || !nomeCliente.trim()) {
      return res.status(400).json({ error: "Nome do cliente é obrigatório." });
    }
    if (!Array.isArray(itens) || itens.length === 0) {
      return res
        .status(400)
        .json({ error: "O pedido precisa ter ao menos um item." });
    }
    if (typeof valorTotal !== "number" || valorTotal <= 0) {
      return res.status(400).json({ error: "Valor total inválido." });
    }

    const descricao = formatarItens(itens);

    const resultado = db
      .prepare(
        "INSERT INTO Pedidos (NomeCliente, NomeProdutoPedido, ValorFinalPedido, Observacoes) VALUES (?, ?, ?, ?)",
      )
      .run(nomeCliente.trim(), descricao, valorTotal, observacoes || null);

    res.status(201).json({
      message: "Pedido criado com sucesso!",
      idPedido: resultado.lastInsertRowid,
      sucesso: true,
    });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido." });
  }
};

export const atualizarPedido = (req, res) => {
  try {
    const { id } = req.params;
    const { nomeCliente, nomePedido, valorFinal } = req.body;
    const resultado = db
      .prepare(
        "UPDATE Pedidos SET NomeCliente = ?, NomeProdutoPedido = ?, ValorFinalPedido = ? WHERE idPedido = ?",
      )
      .run(nomeCliente, nomePedido, valorFinal, id);
    if (resultado.changes === 0)
      return res.status(404).json({ error: "Pedido não encontrado." });
    res.json({ message: "Pedido atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    res.status(500).json({ error: "Erro ao atualizar pedido." });
  }
};

export const deletarPedido = (req, res) => {
  try {
    const { id } = req.params;
    const resultado = db
      .prepare("DELETE FROM Pedidos WHERE idPedido = ?")
      .run(id);
    if (resultado.changes === 0)
      return res.status(404).json({ error: "Pedido não encontrado." });
    res.json({ message: "Pedido deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    res.status(500).json({ error: "Erro ao deletar pedido." });
  }
};
