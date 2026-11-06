import express from "express";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

// Iniciar sesión
router.post("/login", login);

export default router;