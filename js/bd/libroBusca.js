import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaLibro } from "../modelo/validaLibro.js"
import { ALMACEN_LIBRO, Bd } from "./Bd.js"

/**
 * @param {string} id
 */
export async function libroBusca(id) {

 return bdConsulta(Bd, [ALMACEN_LIBRO],
  /**
   * @param {(resultado: import("../modelo/LIBRO.js").LIBRO|undefined) => any} resolve 
   */
  (transaccion, resolve) => {

   /* Pide el primer objeto de ALMACEN_PLAYERA que tenga como llave
    * primaria el valor del parámetro id. */
   const consulta = transaccion.objectStore(ALMACEN_LIBRO).get(id)

   // onsuccess se invoca solo una vez, devolviendo el objeto solicitado.
   consulta.onsuccess = () => {
    /* Se recupera el objeto solicitado usando
     *  consulta.result
     * Si el objeto no se encuentra se recupera undefined. */
    const objeto = consulta.result
    if (objeto !== undefined) {
     const modelo = validaLibro(objeto)
     if (modelo.LIB_ELIMINADO === 0) {
      resolve(modelo)
      return
     }
    }
    resolve(undefined)

   }

  })
}

// Exporta la función de búsqueda de playera a HTML
exportaAHtml(libroBusca)