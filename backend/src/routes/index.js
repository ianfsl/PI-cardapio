import { Router } from "express";
import produtosRoutes from "./produtos.js";
import categoriasRoutes from "./categorias.js";
import pedidosRoutes from "./pedidos.js";
import adicionaisRoutes from "./adicionais.js";
import adminRoutes from "./admin.js";

const router = Router();

router.use("/produtos", produtosRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/pedidos", pedidosRoutes);
router.use("/adicionais", adicionaisRoutes);
router.use("/admin", adminRoutes);

export default router;
