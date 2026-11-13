import jwt from "jsonwebtoken";

// Iniciar sesión
const login = ({ email, password }) => {
  let role;

  // Obtener credenciales configuradas
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const userEmail = process.env.USER_EMAIL;
  const userPassword = process.env.USER_PASSWORD;

  // Verificar que las credenciales del administrador estén configuradas
  if (
    adminEmail &&
    adminPassword &&
    email === adminEmail &&
    password === adminPassword
  ) {
    role = "admin";
  }
  // Verificar que las credenciales del usuario estén configuradas
  else if (
    userEmail &&
    userPassword &&
    email === userEmail &&
    password === userPassword
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