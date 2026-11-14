# API REST de Gestión de Productos

API REST desarrollada con **Node.js, Express y Firebase Cloud Firestore**, que permite gestionar productos mediante operaciones CRUD (crear, consultar, actualizar y eliminar).

El proyecto incorpora autenticación mediante JSON Web Tokens (JWT), autorización basada en roles, validación de datos y conexión a Firebase mediante el Firebase JavaScript SDK (API modular).

Se utilizan dos mecanismos de autenticación independientes: Firebase Authentication para autenticar la cuenta técnica que permite al servidor acceder a Firestore, y JWT para gestionar la autenticación y los permisos de los usuarios de la API.

## Tecnologías utilizadas

- Node.js
- Express
- Firebase JavaScript SDK (API modular)
- Firebase Authentication
- Firebase Firestore Lite
- JSON Web Tokens (JWT)
- CORS
- dotenv
- body-parser

## Funcionalidades

### Gestión de productos

- Obtener todos los productos.
- Consultar un producto por su ID.
- Crear nuevos productos.
- Actualizar productos existentes.
- Eliminar productos.
- Almacenar los datos en Cloud Firestore.

### Autenticación y autorización

- Inicio de sesión mediante credenciales.
- Generación de tokens JWT.
- Autenticación mediante Bearer Token.
- Control de acceso según el rol del usuario.
- Protección de rutas mediante middleware.
- Autenticación de una cuenta técnica de Firebase para acceder a Firestore.

### Validaciones y manejo de errores

- Validación de los datos recibidos.
- Validación de las credenciales de inicio de sesión.
- Verificación de la configuración de las cuentas antes de comparar credenciales.
- Respuestas HTTP adecuadas para cada operación.
- Manejo centralizado de errores.
- Control de rutas inexistentes.
- Control de acceso no autorizado y permisos insuficientes.

## Estructura del proyecto

```text
proyecto-final-backend-v2/
│
├── src/
│   ├── config/
│   │   └── firebase.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── products.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   └── notFound.middleware.js
│   │
│   ├── models/
│   │   └── products.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── products.routes.js
│   │
│   └── services/
│       ├── auth.service.js
│       └── products.service.js
│
├── .env.example
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

## Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/rooz-well/proyecto-final-backend-v2.git
```

Ingresar a la carpeta del proyecto:

```bash
cd proyecto-final-backend-v2
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Completar las variables con los valores correspondientes:

```env
PORT=3000

JWT_SECRET=tu_secreto_jwt_seguro

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=tu_password_admin

USER_EMAIL=user@example.com
USER_PASSWORD=tu_password_usuario

FIREBASE_SERVER_EMAIL=
FIREBASE_SERVER_PASSWORD=

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
```

Los valores anteriores son ejemplos. Se deben utilizar credenciales propias y un secreto JWT seguro.

**Importante:** el archivo `.env` contiene información sensible y no debe subirse al repositorio. Se encuentra excluido del control de versiones mediante `.gitignore`.

### 4. Configurar Firebase

Para conectar la aplicación con Firebase:

1. Crear o utilizar un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Registrar una aplicación web en la configuración del proyecto.
3. Copiar la configuración de Firebase Web y completar las variables correspondientes del archivo `.env`.
4. Habilitar Cloud Firestore.
5. Habilitar el proveedor de autenticación por correo electrónico y contraseña en Firebase Authentication.
6. Crear una cuenta técnica exclusiva para la conexión del servidor a Firebase.
7. Configurar las variables `FIREBASE_SERVER_EMAIL` y `FIREBASE_SERVER_PASSWORD` con las credenciales de esa cuenta.

#### Reglas de seguridad de Firestore

La base de datos utiliza reglas que restringen las operaciones de lectura y escritura a la cuenta técnica autenticada.

Ejemplo:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null
        && request.auth.uid == 'UID_DEL_USUARIO_TECNICO';
    }
  }
}
```

Se debe reemplazar `UID_DEL_USUARIO_TECNICO` por el UID correspondiente a la cuenta técnica creada en Firebase Authentication.

Estas reglas permiten las operaciones de lectura y escritura únicamente cuando la solicitud está autenticada con el UID autorizado.

## Conexión y autenticación

La conexión a Firebase se realiza mediante el Firebase JavaScript SDK con su API modular, utilizando Firebase Authentication y Firestore Lite.

La aplicación utiliza dos mecanismos de autenticación con funciones diferentes.

### Firebase Authentication

Autentica la cuenta técnica que utiliza el servidor para acceder a Firestore.

Al iniciar la aplicación, el servidor:

1. Obtiene las credenciales técnicas desde las variables de entorno.
2. Verifica que estén configuradas.
3. Inicia sesión mediante Firebase Authentication.
4. Una vez autenticado correctamente, inicia el servidor Express.

Si la autenticación falla, el servidor no comienza a aceptar solicitudes.

### JSON Web Tokens (JWT)

Gestiona la autenticación de los usuarios de la API y determina sus permisos según el rol asignado.

Las credenciales `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `USER_EMAIL` y `USER_PASSWORD` corresponden a los usuarios gestionados por la aplicación para el inicio de sesión mediante JWT. No necesitan ser los mismos usuarios creados en Firebase Authentication.

La cuenta técnica de Firebase utiliza las variables `FIREBASE_SERVER_EMAIL` y `FIREBASE_SERVER_PASSWORD`.

No se utiliza Firebase Admin SDK ni se requiere una clave privada de cuenta de servicio.

## Iniciar el servidor

Una vez configuradas las variables de entorno, iniciar la aplicación con:

```bash
npm start
```

Si la autenticación con Firebase es correcta, se mostrarán mensajes similares a los siguientes:

```text
Servidor autenticado correctamente en Firebase.
Servidor escuchando en el puerto 3000
```

Por defecto, la API estará disponible en:

```text
http://localhost:3000
```

## Endpoints de la API

### Estado de la API

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | `/` | Verificar que la API funciona correctamente. | Público |

### Autenticación

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| POST | `/auth/login` | Iniciar sesión y obtener un token JWT. | Público |

### Productos

| Método | Endpoint | Descripción | Acceso |
|---|---|---|---|
| GET | `/api/products` | Obtener todos los productos. | Autenticado |
| GET | `/api/products/:id` | Obtener un producto por ID. | Autenticado |
| POST | `/api/products/create` | Crear un producto. | Administrador |
| PUT | `/api/products/:id` | Actualizar un producto. | Administrador |
| DELETE | `/api/products/:id` | Eliminar un producto. | Administrador |

## Autenticación y roles

Para acceder a las rutas protegidas se debe iniciar sesión mediante:

```http
POST /auth/login
```

Ejemplo de cuerpo de la solicitud:

```json
{
  "email": "admin@example.com",
  "password": "tu_password_admin"
}
```

La respuesta contiene un token JWT y el tipo de autenticación:

```json
{
  "mensaje": "Inicio de sesión exitoso.",
  "token": "TOKEN_JWT",
  "tokenType": "Bearer"
}
```

Para realizar solicitudes a las rutas protegidas, enviar el token en el encabezado HTTP:

```http
Authorization: Bearer TOKEN_JWT
```

### Roles disponibles

- **admin:** puede consultar, crear, actualizar y eliminar productos.
- **user:** puede consultar productos, pero no realizar operaciones de escritura.

Los tokens tienen una duración de una hora.

## Base de datos

La aplicación utiliza Cloud Firestore como base de datos remota.

Los productos se almacenan en la colección:

```text
products
```

Cada producto contiene los siguientes campos:

```json
{
  "name": "Producto de ejemplo",
  "price": 100
}
```

## Códigos de respuesta HTTP

La API utiliza códigos de estado HTTP para identificar el resultado de las solicitudes:

| Código | Descripción |
|---|---|
| 200 | Solicitud procesada correctamente. |
| 201 | Recurso creado correctamente. |
| 400 | Datos de solicitud inválidos. |
| 401 | Autenticación requerida o token inválido. |
| 403 | Permisos insuficientes. |
| 404 | Recurso o ruta no encontrados. |
| 500 | Error interno del servidor. |

## Pruebas realizadas

Se verificaron las funcionalidades principales de la API mediante Postman:

- Inicio de sesión de un usuario común.
- Consulta de productos con un usuario autenticado.
- Rechazo de operaciones de escritura para usuarios sin permisos de administrador (`403 Forbidden`).
- Inicio de sesión de un administrador.
- Creación de productos con permisos de administrador.
- Consulta posterior de los productos creados para comprobar su persistencia en Firestore.
- Validación de solicitudes de inicio de sesión sin correo electrónico o sin contraseña (`400 Bad Request`).

## Seguridad

- Las credenciales se administran mediante variables de entorno.
- Los archivos sensibles están excluidos del control de versiones mediante `.gitignore`.
- La cuenta técnica de Firebase se autentica antes de iniciar el servidor.
- Las reglas de Firestore restringen el acceso a la cuenta técnica autorizada.
- Las rutas protegidas utilizan autenticación JWT.
- Los permisos se verifican según el rol del usuario.
- Los errores internos no exponen detalles técnicos sensibles en las respuestas de la API.
- No se utiliza Firebase Admin SDK ni archivos JSON de cuentas de servicio.

## Autor

**rooz-well**

Proyecto desarrollado como parte de una formación en Backend con Node.js.
