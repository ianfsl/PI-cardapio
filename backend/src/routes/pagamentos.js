import { Router } from "express";
import { processarPagamento, webhook } from "../controllers/pagamentosController.js";

const router = Router();

router.post("/", processarPagamento);
router.post("/webhook", webhook);

export default router;
