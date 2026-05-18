import { Router } from "express";
import {
  processarPagamento,
  webhook,
  gerarComprovante,
} from "../controllers/pagamentosController.js";

const router = Router();

router.post("/", processarPagamento);
router.post("/webhook", webhook);
router.get("/comprovante/:idPedido", gerarComprovante);

export default router;