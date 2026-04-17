import db from "../database/db.js";

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
    const { nomePedido, valorFinal } = req.body;
    const resultado = db
      .prepare(
        `INSERT INTO Pedidos ("Nome do produto pedido", "Valor final do pedido") VALUES (?, ?)`,
      )
      .run(nomePedido, valorFinal);
    res.status(201).json({
      message: "Pedido criado com sucesso!",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido." });
  }
};

export const atualizarPedido = (req, res) => {
  try {
    const { id } = req.params;
    const { nomePedido, valorFinal } = req.body;
    const resultado = db
      .prepare(
        `UPDATE Pedidos SET "Nome do produto pedido" = ?, "Valor final do pedido" = ? WHERE idPedido = ?`,
      )
      .run(nomePedido, valorFinal, id);
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
