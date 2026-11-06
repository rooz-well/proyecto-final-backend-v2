const errorHandler = (err, req, res, next) => {
  // Si Express ya comenzó a enviar una respuesta,
  // delegamos el error al manejador predeterminado.
  if (res.headersSent) {
    return next(err);
  }

  // Obtener el código HTTP del error
  const status = err.status || err.statusCode || 500;

  // No mostrar detalles internos de errores inesperados
  const message =
    status >= 500
      ? "Error interno del servidor."
      : err.message || "Error en la solicitud.";

  // Registrar errores internos en la terminal
  if (status >= 500) {
    console.error(err);
  }

  // Enviar una respuesta JSON uniforme
  res.status(status).json({
    error: message,
  });
};

export default errorHandler;
