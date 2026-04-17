import db from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginAdmin = (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = db
      .prepare(`SELECT * FROM Usuário WHERE "e-mail" = ?`)
      .get(email);
    if (!usuario)
      return res.status(401).json({ error: "E-mail ou senha inválidos." });

    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaCorreta)
      return res.status(401).json({ error: "E-mail ou senha inválidos." });

    const token = jwt.sign(
      { id: usuario["idUsuário"], email: usuario["e-mail"] },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    res.json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
};

export const cadastrarAdmin = (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const existente = db
      .prepare(`SELECT * FROM Usuário WHERE "e-mail" = ?`)
      .get(email);
    if (existente)
      return res.status(400).json({ error: "E-mail já cadastrado." });

    const senhaCriptografada = bcrypt.hashSync(senha, 10);
    const resultado = db
      .prepare(`INSERT INTO Usuário (Nome, "e-mail", senha) VALUES (?, ?, ?)`)
      .run(nome, email, senhaCriptografada);

    res.status(201).json({
      message: "Admin cadastrado com sucesso!",
      id: resultado.lastInsertRowid,
    });
  } catch (error) {
    console.error("Erro ao cadastrar admin:", error);
    res.status(500).json({ error: "Erro ao cadastrar admin." });
  }
};
