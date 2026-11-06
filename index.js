import "dotenv/config";
import app from "./src/app.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./src/config/firebase.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    const email = process.env.FIREBASE_SERVER_EMAIL;
    const password = process.env.FIREBASE_SERVER_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "Faltan las credenciales de acceso del servidor a Firebase."
      );
    }

    await signInWithEmailAndPassword(auth, email, password);

    console.log("Servidor autenticado correctamente en Firebase.");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();
