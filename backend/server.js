import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/database/db.js";

import routes from "./src/routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/api/test", (req, res) => {
  res.json({
    message: "✅ Servidor do PI Cardápio rodando!",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
