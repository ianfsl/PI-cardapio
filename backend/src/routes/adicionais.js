import { Router } from "express";
import {
  listarAdicionais,
  criarAdicional,
  editarAdicional,
  deletarAdicional,
} from "../controllers/adicionaisController.js";
import { autenticarToken } from "../middleware/auth.js";

const router = Router();

router.get("/", listarAdicionais);
router.post("/", autenticarToken, criarAdicional);
router.put("/:id", autenticarToken, editarAdicional);
router.delete("/:id", autenticarToken, deletarAdicional);

export default router;
