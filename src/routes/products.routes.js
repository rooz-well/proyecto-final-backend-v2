import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

import {
  authenticateToken,
  authorizeRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Consultar productos: cualquier usuario autenticado
router.get("/", getProducts);

router.get("/:id", getProductById);

// Crear: solamente administrador
router.post("/create", authorizeRoles("admin"), createProduct);

// Actualizar: solamente administrador
router.put("/:id", authorizeRoles("admin"), updateProduct);

// Eliminar: solamente administrador
router.delete("/:id", authorizeRoles("admin"), deleteProduct);

export default router;