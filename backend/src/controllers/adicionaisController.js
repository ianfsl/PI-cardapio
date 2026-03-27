import pool from "../database/db.js";

export const listarAdicionais = async (req, res) => {
  try {
    const [adicionais] = await pool.query(`
      SELECT pa.idAdicional, pa.nomeAdicional, pa.valorExtra,
             c.idCategoria, c.nomeCategoria
      FROM Prod_Adicionais pa
      JOIN Categoria c ON pa.categoriaId = c.idCategoria
    `);
    res.json(adicionais);
  } catch (error) {
    console.error("Erro ao listar adicionais:", error);
    res.status(500).json({ error: "Erro ao buscar adicionais." });
  }
};

export const criarAdicional = async (req, res) => {
  try {
    const { nomeAdicional, valorExtra, categoriaId } = req.body;

    const [resultado] = await pool.query(
      "INSERT INTO Prod_Adicionais (nomeAdicional, valorExtra, categoriaId) VALUES (?, ?, ?)",
      [nomeAdicional, valorExtra, categoriaId],
    );

    res.status(201).json({
      message: "Adicional criado com sucesso!",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error("Erro ao criar adicional:", error);
    res.status(500).json({ error: "Erro ao criar adicional." });
  }
};

export const editarAdicional = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomeAdicional, valorExtra, categoriaId } = req.body;

    const [resultado] = await pool.query(
      "UPDATE Prod_Adicionais SET nomeAdicional = ?, valorExtra = ?, categoriaId = ? WHERE idAdicional = ?",
      [nomeAdicional, valorExtra, categoriaId, id],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Adicional não encontrado." });
    }

    res.json({ message: "Adicional atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao editar adicional:", error);
    res.status(500).json({ error: "Erro ao editar adicional." });
  }
};

export const deletarAdicional = async (req, res) => {
  try {
    const { id } = req.params;

    const [resultado] = await pool.query(
      "DELETE FROM Prod_Adicionais WHERE idAdicional = ?",
      [id],
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Adicional não encontrado." });
    }

    res.json({ message: "Adicional deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar adicional:", error);
    res.status(500).json({ error: "Erro ao deletar adicional." });
  }
};
