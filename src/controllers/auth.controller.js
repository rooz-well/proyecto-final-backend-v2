import * as authService from "../services/auth.service.js";

// Iniciar sesión
const login = (req, res, next) => {
  try {
    // Validar que el cuerpo de la solicitud sea un objeto
    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body)
    ) {
      const error = new Error(
        "El cuerpo de la solicitud debe ser un objeto JSON válido."
      );
      error.status = 400;
      throw error;
    }

    const { email, password } = req.body;

    const token = authService.login({
      email,
      password,
    });

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso.",
      token,
      tokenType: "Bearer",
    });
  } catch (error) {
    next(error);
  }
};

export { login };
