import jwt from "jsonwebtoken";

// Iniciar sesión
const login = ({ email, password }) => {
  let role;

  // Verificar si es administrador
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    role = "admin";
  }
  // Verificar si es usuario
  else if (
    email === process.env.USER_EMAIL &&
    password === process.env.USER_PASSWORD
  ) {
    role = "user";
  }
  // Credenciales incorrectas
  else {
    const error = new Error("Credenciales inválidas.");
    error.status = 401;
    throw error;
  }

  // Verificar que exista el secreto JWT
  if (!process.env.JWT_SECRET) {
    const error = new Error("No está configurado el secreto JWT.");
    error.status = 500;
    throw error;
  }

  // Generar el token
  const token = jwt.sign(
    {
      email,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

export { login };