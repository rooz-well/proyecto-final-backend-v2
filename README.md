# API REST de Gestión de Productos

API REST desarrollada con **Node.js**, **Express** y **Firebase Firestore**, que permite gestionar productos mediante operaciones CRUD (crear, consultar, actualizar y eliminar).

Incluye autenticación mediante **JSON Web Tokens (JWT)**, control de acceso basado en roles, validación de datos y conexión a Firebase mediante el SDK modular de Firebase.

## Tecnologías utilizadas

- Node.js
- Express
- Firebase SDK modular
- Firebase Firestore Lite
- Firebase Authentication
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
- Rutas protegidas mediante middleware.

### Validaciones y manejo de errores

- Validación de los datos recibidos.
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
git clone URL_DEL_REPOSITORIO
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

JWT_SECRET=tu_secreto_jwt

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=tu_password_admin

USER_EMAIL=user@example.com
USER_PASSWORD=tu_password_usuario

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

FIREBASE_SERVER_EMAIL=
FIREBASE_SERVER_PASSWORD=
```

Los valores anteriores son ejemplos. Se deben utilizar credenciales propias y un secreto JWT seguro.

**Importante:** el archivo `.env` contiene información sensible y no debe subirse al repositorio.

### 4. Configurar Firebase

Para conectar la aplicación con Firebase:

1. Crear o utilizar un proyecto en Firebase.
2. Registrar una aplicación web en la configuración del proyecto.
3. Copiar la configuración de Firebase Web y completar las variables correspondientes del archivo `.env`.
4. Habilitar Cloud Firestore.
5. Habilitar el proveedor de autenticación por correo electrónico y contraseña en Firebase Authentication.
6. Crear un usuario técnico exclusivo para la conexión del servidor.
7. Configurar las reglas de seguridad de Firestore para permitir el acceso únicamente al usuario técnico autorizado.

La conexión se realiza mediante el **Firebase SDK modular**, utilizando Firebase Authentication y Firestore Lite.

Firestore Lite permite realizar las operaciones necesarias para la gestión de productos, como consultas, creación, actualización y eliminación de documentos.

La autenticación de los usuarios de la API se gestiona mediante JWT, mientras que la cuenta técnica permite al servidor acceder a Firestore.

**Importante:** no se utiliza Firebase Admin SDK ni se requiere una clave privada de cuenta de servicio.

Las credenciales de Firebase y los datos de acceso deben mantenerse protegidos mediante variables de entorno.

### 5. Iniciar el servidor

```bash
npm run start
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

La aplicación utiliza **Cloud Firestore** como base de datos remota.

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

## Seguridad

- Las credenciales se administran mediante variables de entorno.
- Los archivos sensibles están excluidos del control de versiones mediante `.gitignore`.
- Las rutas protegidas utilizan autenticación JWT.
- Los permisos se verifican según el rol del usuario.
- Firestore utiliza reglas de seguridad para restringir el acceso a la cuenta técnica autorizada.
- Los errores internos no exponen detalles técnicos sensibles en las respuestas de la API.
- No se utiliza Firebase Admin SDK ni archivos JSON de cuentas de servicio.

## Autor

**rooz-well**

Proyecto desarrollado como parte de una formación en Backend con Node.js.