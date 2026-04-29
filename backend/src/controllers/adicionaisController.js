import db from "../database/db.js";

export const listarAdicionais = (req, res) => {
  try {
    const adicionais = db
      .prepare(
        `
      SELECT pa.idAdicional, pa.NomeProdutoAdicional, pa.ValorExtra, pa.ImagemProdutosAdicionais,
             c.idCategoria, c.NomeCategoria
      FROM ProdutosAdicionais pa
      JOIN Categoria c ON pa.CategoriaProdutoAdicional = c.idCategoria
    `,
      )
      .all();
    res.json(adicionais);
  } catch (error) {
    console.error("Erro ao listar adicionais:", error);
    res.status(500).json({ error: "Erro ao buscar adicionais." });
  }
};

export const criarAdicional = (req, res) => {
  try {
    const { nomeAdicional, valorExtra, categoriaId, imagem } = req.body;
    const resultado = db
      .prepare(
        `INSERT INTO ProdutosAdicionais (NomeProdutoAdicional, ValorExtra, CategoriaProdutoAdicional, ImagemProdutosAdicionais) VALUES (?, ?, ?, ?)`,
      )
      .run(nomeAdicional, valorExtra, categoriaId, imagem);
    res.status(201).json({
      message: "Adicional criado com sucesso!",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error("Erro ao criar adicional:", error);
    res.status(500).json({ error: "Erro ao criar adicional." });
  }
};

export const editarAdicional = (req, res) => {
  try {
    const { id } = req.params;
    const { nomeAdicional, valorExtra, categoriaId, imagem } = req.body;
    const resultado = db
      .prepare(
        `UPDATE ProdutosAdicionais SET NomeProdutoAdicional = ?, ValorExtra = ?, CategoriaProdutoAdicional = ?, ImagemProdutosAdicionais = ? WHERE idAdicional = ?`,
      )
      .run(nomeAdicional, valorExtra, categoriaId, imagem, id);
    if (resultado.changes === 0)
      return res.status(404).json({ error: "Adicional não encontrado." });
    res.json({ message: "Adicional atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao editar adicional:", error);
    res.status(500).json({ error: "Erro ao editar adicional." });
  }
};

export const deletarAdicional = (req, res) => {
  try {
    const { id } = req.params;
    const resultado = db
      .prepare(`DELETE FROM ProdutosAdicionais WHERE idAdicional = ?`)
      .run(id);
    if (resultado.changes === 0)
      return res.status(404).json({ error: "Adicional não encontrado." });
    res.json({ message: "Adicional deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar adicional:", error);
    res.status(500).json({ error: "Erro ao deletar adicional." });
  }
};
