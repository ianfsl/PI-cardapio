import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const autenticarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Acesso negado. Token não fornecido.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({
        error: "Token inválido ou expirado.",
      });
    }

    req.usuario = usuario;
    next();
  });
};
