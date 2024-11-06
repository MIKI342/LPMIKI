// services/indexedDBService.js

import { openDB } from 'idb';

const DB_NAME = 'ProductsDB';
const STORE_NAME = 'products';
const DB_VERSION = 1;

// Tiempo de expiración de los datos en milisegundos (24 horas)
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;

// Inicializar la base de datos
const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

// Guardar productos en IndexedDB
export const setProductsInDB = async (category, page, products) => {
  const db = await dbPromise;
  const dataWithTimestamp = {
    products,
    timestamp: Date.now(),
  };
  const key = `${category}-${page}`;
  console.log(`Guardando productos en IndexedDB para categoría: ${category}, página: ${page}, clave: ${key}`);
  await db.put(STORE_NAME, { id: key, ...dataWithTimestamp });
};

// Obtener productos de IndexedDB
export const getProductsFromDB = async (category, page) => {
  const db = await dbPromise;
  const key = `${category}-${page}`;
  const cachedData = await db.get(STORE_NAME, key);
  
  if (!cachedData) return null;

  const currentTime = Date.now();
  const isExpired = currentTime - cachedData.timestamp > EXPIRATION_TIME;

  if (isExpired) {
    console.log(`Datos en IndexedDB caducados para categoría: ${category}, página: ${page}. Eliminando...`);
    await db.delete(STORE_NAME, key);
    return null;
  }

  console.log(`Datos obtenidos de IndexedDB para categoría: ${category}, página: ${page}.`);
  return cachedData.products;
};

// Limpiar productos de una categoría específica
export const clearProductsFromDB = async (category) => {
  const db = await dbPromise;
  const allKeys = await db.getAllKeys(STORE_NAME);
  const keysToDelete = allKeys.filter(key => key.startsWith(`${category}-`));
  
  if (keysToDelete.length > 0) {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    for (const key of keysToDelete) {
      tx.store.delete(key);
      console.log(`Eliminando clave de IndexedDB: ${key}`);
    }
    await tx.done;
  }
};
