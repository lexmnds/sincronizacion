import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { ALMACEN_LIBRO, Bd } from "./Bd.js"

/**
 * Borra el contenido del almacén PLAYERA y guarda nuevosLibros.
 * @param {import("../modelo/LIBRO.js").LIBRO[]} nuevosLibros
 */
export async function librosReemplaza(nuevosLibros) {
 return bdEjecuta(Bd, [ALMACEN_LIBRO], transaccion => {
  const almacenLibro = transaccion.objectStore(ALMACEN_LIBRO)
  almacenLibro.clear()
  for (const objeto of nuevosLibros) {
   almacenLibro.add(objeto)
  }
 })
}