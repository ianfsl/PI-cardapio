import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./src/database/db.js";

import routes from "./src/routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/api/test", (req, res) => {
  res.json({
    message: "✅ Servidor do PI Cardápio rodando!",
  });
});

export default app;
