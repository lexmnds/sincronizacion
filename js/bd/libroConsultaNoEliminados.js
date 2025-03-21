import { bdConsulta } from "../../lib/js/bdConsulta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { validaLibro } from "../modelo/validaLibro.js"
import { ALMACEN_LIBRO, Bd, INDICE_TITULO } from "./Bd.js"
//import { ALMACEN_LIBRO, Bd, INDICE_ISBN } from "./Bd.js"

export async function libroConsultaNoEliminados() {

 return bdConsulta(Bd, [ALMACEN_LIBRO],
  /**
   * @param {(resultado: import("../modelo/LIBRO.js").LIBRO[])=>void
   *                                                                  } resolve
   */
  (transaccion, resolve) => {

   const resultado = []

   const almacenLibro = transaccion.objectStore(ALMACEN_LIBRO)

   // Usa el índice INDICE_NOMBRE para recuperar los datos ordenados.
   const indiceTitulo = almacenLibro.index(INDICE_TITULO)

   // Pide un cursor para recorrer cada objeto que devuelve la consulta.
   const consulta = indiceTitulo.openCursor()

   /* onsuccess se invoca por cada uno de los objetos de la consulta y una vez
    * cuando se acaban dichos objetos. */
   consulta.onsuccess = () => {
    /* El cursor correspondiente al objeto se recupera usando
     *  consulta.result */
    const cursor = consulta.result
    if (cursor === null) {
     /* Si el cursor vale null, ya no hay más objetos que procesar; por lo
      * mismo, se devuelve el resultado con los pasatiempos recuperados, usando
      *  resolve(resultado). */
     resolve(resultado)
    } else {
     /* Si el cursor no vale null y hay más objetos, el siguiente se obtiene con
      *  cursor.value */
     const modelo = validaLibro(cursor.value)
     if (modelo.LIB_ELIMINADO === 0) {
      resultado.push(modelo)
     }
     /* Busca el siguiente objeto de la consulta, que se recupera la siguiente
      * vez que se invoque la función onsuccess. */
     cursor.continue()
    }
   }


  })

}

exportaAHtml(libroConsultaNoEliminados)