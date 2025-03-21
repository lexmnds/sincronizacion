export const ALMACEN_LIBRO = "LIBRO"
export const LIB_ID = "LIB_ID"
export const INDICE_TITULO = "INDICE_TITULO"
export const INDICE_ISBN = "INDICE_ISBN"
export const LIB_TITULO = "LIB_TITULO"
export const LIB_AUTOR = "LIB_AUTOR"
export const LIB_ISBN = "LIB_ISBN"
export const LIB_EDITORIAL = "LIB_EDITORIAL"
const BD_NOMBRE = "sincronizacion"
const BD_VERSION = 1

/** @type { Promise<IDBDatabase> } */
export const Bd = new Promise((resolve, reject) => {

 /* Se solicita abrir la base de datos, indicando nombre y
  * número de versión. */
 const solicitud = indexedDB.open(BD_NOMBRE, BD_VERSION)

 // Si se presenta un error, rechaza la promesa.
 solicitud.onerror = () => reject(solicitud.error)

 // Si se abre con éxito, devuelve una conexión a la base de datos.
 solicitud.onsuccess = () => resolve(solicitud.result)

 // Si es necesario, se inicia una transacción para cambio de versión.
 solicitud.onupgradeneeded = () => {

  const bd = solicitud.result

  // Como hay cambio de versión, borra el almacén si es que existe.
  if (bd.objectStoreNames.contains(ALMACEN_LIBRO)) {
   bd.deleteObjectStore(ALMACEN_LIBRO)
  }

  // Crea el almacén "LIBRO" con el campo llave "LIB_ID".
  const almacenLibro=
   bd.createObjectStore(ALMACEN_LIBRO, { keyPath: LIB_ID })

  // Crea un índice ordenado por el campo "LIB_TITULO" que no acepta duplicados.
  almacenLibro.createIndex(INDICE_TITULO, "LIB_TITULO")

  almacenLibro.createIndex(INDICE_ISBN, "LIB_ISBN")
 }

})