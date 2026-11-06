import * as productModel from "../models/products.model.js";

// Crear un error con su correspondiente código HTTP
const createError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

// Validar los datos de un producto
const validateProduct = (productData) => {
  if (
    !productData ||
    typeof productData !== "object" ||
    Array.isArray(productData)
  ) {
    throw createError(
      "Los datos del producto deben ser un objeto JSON válido.",
      400
    );
  }

  const { name, price } = productData;

  if (typeof name !== "string" || !name.trim()) {
    throw createError("El nombre del producto es obligatorio.", 400);
  }

  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
    throw createError(
      "El precio debe ser un número válido mayor o igual a cero.",
      400
    );
  }
};

// Obtener todos los productos
const getProducts = async () => {
  return await productModel.getAll();
};

// Obtener un producto por ID
const getProductById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) {
    throw createError("Producto no encontrado.", 404);
  }

  return product;
};

// Crear un producto
const createProduct = async (productData) => {
  validateProduct(productData);

  const newProduct = await productModel.create({
    name: productData.name.trim(),
    price: productData.price,
  });

  return newProduct;
};

// Actualizar un producto
const updateProduct = async (id, productData) => {
  validateProduct(productData);

  const updatedProduct = await productModel.updateById(id, {
    name: productData.name.trim(),
    price: productData.price,
  });

  if (!updatedProduct) {
    throw createError("Producto no encontrado.", 404);
  }

  return updatedProduct;
};

// Eliminar un producto
const deleteProduct = async (id) => {
  const deleted = await productModel.deleteById(id);

  if (!deleted) {
    throw createError("Producto no encontrado.", 404);
  }

  return deleted;
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
