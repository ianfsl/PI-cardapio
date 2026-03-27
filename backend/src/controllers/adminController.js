import pool from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginAdmin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const [usuarios] = await pool.query(
      "SELECT * FROM Usuario WHERE email = ?",
      [email],
    );

    if (usuarios.length === 0) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    const usuario = usuarios[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    const token = jwt.sign(
      { id: usuario.idUsuario, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({
      message: "Login realizado com sucesso!",
      token,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
};

export const cadastrarAdmin = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const [existente] = await pool.query(
      "SELECT * FROM Usuario WHERE email = ?",
      [email],
    );

    if (existente.length > 0) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const [resultado] = await pool.query(
      "INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senhaCriptografada],
    );

    res.status(201).json({
      message: "Admin cadastrado com sucesso!",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error("Erro ao cadastrar admin:", error);
    res.status(500).json({ error: "Erro ao cadastrar admin." });
  }
};
