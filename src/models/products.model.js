import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";

import db from "../config/firebase.js";

const productsCollection = collection(db, "products");

// Obtener todos los productos
const getAll = async () => {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

// Obtener un producto por ID
const getById = async (id) => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

// Crear un producto
const create = async (productData) => {
  const docRef = await addDoc(productsCollection, productData);
  const snapshot = await getDoc(docRef);

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
};

// Actualizar un producto
const updateById = async (id, productData) => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return null;

  await updateDoc(docRef, productData);

  const updatedSnapshot = await getDoc(docRef);

  return {
    id: updatedSnapshot.id,
    ...updatedSnapshot.data(),
  };
};

// Eliminar un producto
const deleteById = async (id) => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) return false;

  await deleteDoc(docRef);

  return true;
};

export {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
