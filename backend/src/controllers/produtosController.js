import db from "../database/db.js";

export const listarProdutos = (req, res) => {
  try {
    const produtos = db
      .prepare(
        `
  SELECT p.idProduto, p.NomeProduto, p.ValorProduto,
         p.ImagemProduto AS ImagemProdutos,
         c.idCategoria, c.NomeCategoria
  FROM Produtos p
  JOIN Categoria c ON p.CategoriaProduto = c.idCategoria
`,
      )
      .all();
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
};

export const buscarProdutoPorId = (req, res) => {
  try {
    const { id } = req.params;
    const produto = db
      .prepare(
        `
  SELECT p.idProduto, p.NomeProduto, p.ValorProduto,
         p.ImagemProduto AS ImagemProdutos,
         c.idCategoria, c.NomeCategoria
  FROM Produtos p
  JOIN Categoria c ON p.CategoriaProduto = c.idCategoria
  WHERE p.idProduto = ?
`,
      )
      .get(id);
    if (!produto)
      return res.status(404).json({ error: "Produto não encontrado." });
    res.json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
};

export const criarProduto = (req, res) => {
  try {
    const { nomeProduto, valorProduto, categoriaId, imagem } = req.body;
    const resultado = db
      .prepare(
        "INSERT INTO Produtos (NomeProduto, ValorProduto, CategoriaProduto, ImagemProduto) VALUES (?, ?, ?, ?)",
      )
      .run(nomeProduto, valorProduto, categoriaId, imagem);
    res.status(201).json({
      message: "Produto criado com sucesso!",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto." });
  }
};

export const editarProduto = (req, res) => {
  try {
    const { id } = req.params;
    const { nomeProduto, valorProduto, categoriaId, imagem } = req.body;
    const resultado = db
      .prepare(
        "UPDATE Produtos SET NomeProduto = ?, ValorProduto = ?, CategoriaProduto = ?, ImagemProduto = ? WHERE idProduto = ?",
      )
      .run(nomeProduto, valorProduto, categoriaId, imagem, id);
    if (resultado.changes === 0)
      return res.status(404).json({ error: "Produto não encontrado." });
    res.json({ message: "Produto atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    res.status(500).json({ error: "Erro ao editar produto." });
  }
};

export const deletarProduto = (req, res) => {
  try {
    const { id } = req.params;
    const resultado = db
      .prepare("DELETE FROM Produtos WHERE idProduto = ?")
      .run(id);
    if (resultado.changes === 0)
      return res.status(404).json({ error: "Produto não encontrado." });
    res.json({ message: "Produto deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
};
