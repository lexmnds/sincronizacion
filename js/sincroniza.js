import { enviaJson } from "../lib/js/enviaJson.js"
import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { muestraError } from "../lib/js/muestraError.js"
import { libroConsultaTodos } from "./bd/libroConsultaTodos.js"
import { librosReemplaza } from "./bd/librosReemplaza.js"
import { esperaUnPocoYSincroniza } from "./esperaUnPocoYSincroniza.js"
import { validaLibros } from "./modelo/validaLibros.js"
import { renderiza } from "./renderiza.js"

/**
 * @param {HTMLUListElement} lista
 */
export async function sincroniza(lista) {
 try {
  if (navigator.onLine) {
   const todos = await libroConsultaTodos()
   const respuesta = await enviaJson("srv/sincroniza.php", todos)
   const libros = validaLibros(respuesta.body)
   await librosReemplaza(libros)
   renderiza(lista, libros)
  }
 } catch (error) {
  muestraError(error)
 }
 esperaUnPocoYSincroniza(lista)

}

exportaAHtml(sincroniza)