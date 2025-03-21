import { bdEjecuta } from "../../lib/js/bdEjecuta.js"
import { creaIdCliente } from "../../lib/js/creaIdCliente.js"
import { ALMACEN_LIBRO, Bd } from "./Bd.js"
import { validaTitulo } from "../modelo/validaTitulo.js"
import { validaAutor } from "../modelo/validaAutor.js"
import { validaIsbn } from "../modelo/validaIsbn.js"
//import { validaIsbn } from "../modelo/validaIsbn.js"
import { validaEditorial } from "../modelo/validaEditorial.js"
import { exportaAHtml } from "../../lib/js/exportaAHtml.js"

/**
 * @param {import("../modelo/LIBRO.js").LIBRO} modelo
 */
export async function libroAgrega(modelo) {
 validaTitulo(modelo.LIB_TITULO)
 validaAutor(modelo.LIB_AUTOR)
 validaIsbn(modelo.LIB_ISBN)
 validaEditorial(modelo.LIB_EDITORIAL)
 modelo.LIB_MODIFICACION = Date.now()
 modelo.LIB_ELIMINADO = 0
 // Genera id único en internet.
 modelo.LIB_ID = creaIdCliente(Date.now().toString())
 return bdEjecuta(Bd, [ALMACEN_LIBRO], transaccion => {
  const almacenLibro= transaccion.objectStore(ALMACEN_LIBRO)
  almacenLibro.add(modelo)
 })
}

exportaAHtml(libroAgrega)