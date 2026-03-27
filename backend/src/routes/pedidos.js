import { Router } from "express";
import {
  listarPedidos,
  buscarPedidoPorId,
  criarPedido,
  atualizarPedido,
  deletarPedido,
} from "../controllers/pedidosController.js";
import { autenticarToken } from "../middleware/auth.js";

const router = Router();

router.get("/", autenticarToken, listarPedidos);
router.get("/:id", autenticarToken, buscarPedidoPorId);
router.post("/", criarPedido);
router.put("/:id", autenticarToken, atualizarPedido);
router.delete("/:id", autenticarToken, deletarPedido);

export default router;
