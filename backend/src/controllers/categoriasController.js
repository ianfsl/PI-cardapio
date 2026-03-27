import pool from "../database/db.js";

export const listarCategorias = async (req, res) => {
  try {
    const [categorias] = await pool.query("SELECT * FROM Categoria");
    res.json(categorias);
  } catch (error) {
    console.error("Erro ao listar categorias:", error);
    res.status(500).json({ error: "Erro ao buscar categorias." });
  }
};

export const criarCategoria = async (req, res) => {
  try {
    const { nomeCategoria } = req.body;

    const [resultado] = await pool.query(
      "INSERT INTO Categoria (nomeCategoria) VALUES (?)",
      [nomeCategoria],
    );

    res.status(201).json({
      message: "Categoria criada com sucesso!",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    res.status(500).json({ error: "Erro ao criar categoria." });
  }
};

export const editarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeCategoria } = req.body;

    const [resultado] = await pool.query(
      "UPDATE Categoria SET nomeCategoria = ? WHERE idCategoria = ?",
      [nomeCategoria, id],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }

    res.json({ message: "Categoria atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao editar categoria:", error);
    res.status(500).json({ error: "Erro ao editar categoria." });
  }
};

export const deletarCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await pool.query(
      "DELETE FROM Categoria WHERE idCategoria = ?",
      [id],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }

    res.json({ message: "Categoria deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    res.status(500).json({ error: "Erro ao deletar categoria." });
  }
};
