
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import errorHandler from "./middlewares/errorHandler.middleware.js";
import notFound from "./middlewares/notFound.middleware.js";

import productsRouter from "./routes/products.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

// Configuración de Express
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use("/auth", authRouter);
app.use("/api/products", productsRouter);

// Ruta principal
app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

// Manejo de errores
app.use(notFound);
app.use(errorHandler);

export default app;
