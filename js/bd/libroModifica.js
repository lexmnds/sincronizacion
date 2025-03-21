import { bdEjecuta } from "../../lib/js/bdEjecuta.js";
import { exportaAHtml } from "../../lib/js/exportaAHtml.js";
import { validaId } from "../modelo/validaId.js";
import { validaTitulo } from "../modelo/validaTitulo.js";
import { validaAutor } from "../modelo/validaAutor.js";
import { validaIsbn } from "../modelo/validaISBN.js";
import { validaEditorial } from "../modelo/validaEditorial.js";
import { ALMACEN_LIBRO, Bd } from "./Bd.js";
import { libroBusca } from "./libroBusca.js";

/**
 * @param { import("../modelo/LIBRO.js").LIBRO } modelo
 */
export async function libroModifica(modelo) {
  // Validación de los campos
  validaTitulo(modelo.LIB_TITULO);
  validaAutor(modelo.LIB_AUTOR);
  validaIsbn(modelo.LIB_ISBN);
  validaEditorial(modelo.LIB_EDITORIAL);

  if (modelo.LIB_ID === undefined)
    throw new Error(`Falta LIB_ID de ${modelo.LIB_TITULO}.`)
   validaId(modelo.LIB_ID)
   const anterior = await libroBusca(modelo.LIB_ID)
   if (anterior !== undefined) {
    modelo.LIB_MODIFICACION = Date.now()
    modelo.LIB_ELIMINADO = 0
    return bdEjecuta(Bd, [ALMACEN_LIBRO], transaccion => {
     const almacenLibro = transaccion.objectStore(ALMACEN_LIBRO)
     almacenLibro.put(modelo)
    })
   }
}

// Exporta la función a HTML para su uso
exportaAHtml(libroModifica);