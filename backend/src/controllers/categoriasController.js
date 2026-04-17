import db from "../database/db.js";

export const listarCategorias = (req, res) => {
  try {
    const categorias = db.prepare("SELECT * FROM Categoria").all();
    res.json(categorias);
  } catch (error) {
    console.error("Erro ao listar categorias:", error);
    res.status(500).json({ error: "Erro ao buscar categorias." });
  }
};

export const criarCategoria = (req, res) => {
  try {
    const { nomeCategoria } = req.body;
    const resultado = db
      .prepare(`INSERT INTO Categoria ("Nome da categoria") VALUES (?)`)
      .run(nomeCategoria);
    res.status(201).json({
      message: "Categoria criada com sucesso!",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    res.status(500).json({ error: "Erro ao criar categoria." });
  }
};

export const editarCategoria = (req, res) => {
  try {
    const { id } = req.params;
    const { nomeCategoria } = req.body;
    const resultado = db
      .prepare(
        `UPDATE Categoria SET "Nome da categoria" = ? WHERE idCategoria = ?`,
      )
      .run(nomeCategoria, id);
    if (resultado.changes === 0)
      return res.status(404).json({ error: "Categoria não encontrada." });
    res.json({ message: "Categoria atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao editar categoria:", error);
    res.status(500).json({ error: "Erro ao editar categoria." });
  }
};

export const deletarCategoria = (req, res) => {
  try {
    const { id } = req.params;
    const resultado = db
      .prepare("DELETE FROM Categoria WHERE idCategoria = ?")
      .run(id);
    if (resultado.changes === 0)
      return res.status(404).json({ error: "Categoria não encontrada." });
    res.json({ message: "Categoria deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    res.status(500).json({ error: "Erro ao deletar categoria." });
  }
};
