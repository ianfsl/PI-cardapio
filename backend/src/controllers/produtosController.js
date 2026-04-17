import db from "../database/db.js";

// Listar todos os produtos
export const listarProdutos = (req, res) => {
  try {
    const produtos = db
      .prepare(
        `
      SELECT p.idProduto, p."Nome do produto", p."Valor do produto",
             c.idCategoria, c."Nome da categoria"
      FROM Produtos p
      JOIN Categoria c ON p."Categoria do produto" = c.idCategoria
    `,
      )
      .all();
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
};

// Buscar produto por ID
export const buscarProdutoPorId = (req, res) => {
  try {
    const { id } = req.params;
    const produto = db
      .prepare(
        `
      SELECT p.idProduto, p."Nome do produto", p."Valor do produto",
             c.idCategoria, c."Nome da categoria"
      FROM Produtos p
      JOIN Categoria c ON p."Categoria do produto" = c.idCategoria
      WHERE p.idProduto = ?
    `,
      )
      .get(id);

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json(produto);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
};

// Criar produto
export const criarProduto = (req, res) => {
  try {
    const { nomeProduto, valorProduto, categoriaId } = req.body;

    const resultado = db
      .prepare(
        `INSERT INTO Produtos ("Nome do produto", "Valor do produto", "Categoria do produto") VALUES (?, ?, ?)`,
      )
      .run(nomeProduto, valorProduto, categoriaId);

    res.status(201).json({
      message: "Produto criado com sucesso!",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto." });
  }
};

// Editar produto
export const editarProduto = (req, res) => {
  try {
    const { id } = req.params;
    const { nomeProduto, valorProduto, categoriaId } = req.body;

    const resultado = db
      .prepare(
        `UPDATE Produtos SET "Nome do produto" = ?, "Valor do produto" = ?, "Categoria do produto" = ? WHERE idProduto = ?`,
      )
      .run(nomeProduto, valorProduto, categoriaId, id);

    if (resultado.changes === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json({ message: "Produto atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    res.status(500).json({ error: "Erro ao editar produto." });
  }
};

// Deletar produto
export const deletarProduto = (req, res) => {
  try {
    const { id } = req.params;

    const resultado = db
      .prepare("DELETE FROM Produtos WHERE idProduto = ?")
      .run(id);

    if (resultado.changes === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json({ message: "Produto deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
};
