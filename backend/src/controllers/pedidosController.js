import pool from "../database/db.js";

export const listarPedidos = async (req, res) => {
  try {
    const [pedidos] = await pool.query(
      "SELECT * FROM Pedidos ORDER BY idPedido DESC",
    );
    res.json(pedidos);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ error: "Erro ao buscar pedidos." });
  }
};

export const buscarPedidoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [pedido] = await pool.query(
      "SELECT * FROM Pedidos WHERE idPedido = ?",
      [id],
    );

    if (pedido.length === 0) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    res.json(pedido[0]);
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res.status(500).json({ error: "Erro ao buscar pedido." });
  }
};

export const criarPedido = async (req, res) => {
  try {
    const { nomePedido, valorFinal } = req.body;

    const [resultado] = await pool.query(
      "INSERT INTO Pedidos (nomePedido, valorFinal) VALUES (?, ?)",
      [nomePedido, valorFinal],
    );

    res.status(201).json({
      message: "Pedido criado com sucesso!",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: "Erro ao criar pedido." });
  }
};

export const atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomePedido, valorFinal } = req.body;

    const [resultado] = await pool.query(
      "UPDATE Pedidos SET nomePedido = ?, valorFinal = ? WHERE idPedido = ?",
      [nomePedido, valorFinal, id],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    res.json({ message: "Pedido atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error);
    res.status(500).json({ error: "Erro ao atualizar pedido." });
  }
};

export const deletarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await pool.query(
      "DELETE FROM Pedidos WHERE idPedido = ?",
      [id],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    res.json({ message: "Pedido deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    res.status(500).json({ error: "Erro ao deletar pedido." });
  }
};
