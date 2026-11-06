import * as productService from "../services/products.service.js";

// Validar el cuerpo de la solicitud
const validateRequestBody = (body) => {
  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body)
  ) {
    const error = new Error(
      "El cuerpo de la solicitud debe ser un objeto JSON válido."
    );
    error.status = 400;
    throw error;
  }
};

// Obtener todos los productos
const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Obtener un producto por ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// Crear un producto
const createProduct = async (req, res, next) => {
  try {
    validateRequestBody(req.body);

    const { name, price } = req.body;

    const newProduct = await productService.createProduct({
      name,
      price,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// Actualizar un producto
const updateProduct = async (req, res, next) => {
  try {
    validateRequestBody(req.body);

    const { id } = req.params;
    const { name, price } = req.body;

    const updatedProduct = await productService.updateProduct(id, {
      name,
      price,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Eliminar un producto
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productService.deleteProduct(id);

    res.status(200).json({
      mensaje: "Producto eliminado correctamente",
      productoId: id,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
