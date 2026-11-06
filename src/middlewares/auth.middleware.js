import jwt from "jsonwebtoken";

// Verificar el token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Comprobar que exista un token Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Token de acceso requerido.",
    });
  }

  const token = authHeader.slice(7);

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar los datos del usuario
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido o expirado.",
    });
  }
};

// Verificar permisos según el rol
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "No tenés permisos para realizar esta operación.",
      });
    }

    next();
  };
};

export {
  authenticateToken,
  authorizeRoles,
};