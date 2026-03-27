import { Router } from "express";
import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  editarProduto,
  deletarProduto,
} from "../controllers/produtosController.js";
import { autenticarToken } from "../middleware/auth.js";

const router = Router();

router.get("/", listarProdutos);
router.get("/:id", buscarProdutoPorId);
router.post("/", autenticarToken, criarProduto);
router.put("/:id", autenticarToken, editarProduto);
router.delete("/:id", autenticarToken, deletarProduto);

export default router;
