import pool from "../database/db.js";

export const listarProdutos = async (req, res) => {
  try {
    const [produtos] = await pool.query(`
      SELECT p.idProduto, p.nomeProduto, p.valorProduto, 
             c.idCategoria, c.nomeCategoria
      FROM Produtos p
      JOIN Categoria c ON p.categoriaId = c.idCategoria
    `);
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
};

export const buscarProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [produto] = await pool.query(
      `
      SELECT p.idProduto, p.nomeProduto, p.valorProduto,
             c.idCategoria, c.nomeCategoria
      FROM Produtos p
      JOIN Categoria c ON p.categoriaId = c.idCategoria
      WHERE p.idProduto = ?
    `,
      [id],
    );

    if (produto.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json(produto[0]);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
};

export const criarProduto = async (req, res) => {
  try {
    const { nomeProduto, valorProduto, categoriaId } = req.body;

    const [resultado] = await pool.query(
      "INSERT INTO Produtos (nomeProduto, valorProduto, categoriaId) VALUES (?, ?, ?)",
      [nomeProduto, valorProduto, categoriaId],
    );

    res.status(201).json({
      message: "Produto criado com sucesso!",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto." });
  }
};

export const editarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeProduto, valorProduto, categoriaId } = req.body;

    const [resultado] = await pool.query(
      "UPDATE Produtos SET nomeProduto = ?, valorProduto = ?, categoriaId = ? WHERE idProduto = ?",
      [nomeProduto, valorProduto, categoriaId, id],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json({ message: "Produto atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao editar produto:", error);
    res.status(500).json({ error: "Erro ao editar produto." });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await pool.query(
      "DELETE FROM Produtos WHERE idProduto = ?",
      [id],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.json({ message: "Produto deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
};
