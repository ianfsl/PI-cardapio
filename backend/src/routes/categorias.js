import { Router } from "express";
import {
  listarCategorias,
  criarCategoria,
  editarCategoria,
  deletarCategoria,
} from "../controllers/categoriasController.js";
import { autenticarToken } from "../middleware/auth.js";

const router = Router();

router.get("/", listarCategorias);
router.post("/", autenticarToken, criarCategoria);
router.put("/:id", autenticarToken, editarCategoria);
router.delete("/:id", autenticarToken, deletarCategoria);

export default router;
