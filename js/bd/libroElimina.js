import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"
import { ALMACEN_LIBRO, Bd } from "./Bd.js"
import { libroBusca } from "./libroBusca.js"

/**
 * @param { string } id
 */
export async function libroElimina(id) {
  const modelo = await libroBusca(id)

  if (modelo !== undefined) {
    modelo.LIB_MODIFICACION = Date.now()
    modelo.LIB_ELIMINADO = 1
    return bdEjecuta(Bd, [ALMACEN_LIBRO], transaccion => {
     const almacenLibro = transaccion.objectStore(ALMACEN_LIBRO)
     almacenLibro.put(modelo)
    })
   }

}

exportaAHtml(libroElimina)