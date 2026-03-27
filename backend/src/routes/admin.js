import { Router } from "express";
import { loginAdmin, cadastrarAdmin } from "../controllers/adminController.js";

const router = Router();

router.post("/login", loginAdmin);
router.post("/cadastrar", cadastrarAdmin);

export default router;
