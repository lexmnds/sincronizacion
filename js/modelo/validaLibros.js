import { validaPlayera } from "./validaLibro.js"

/**
 * @param { any } objetos
 * @returns {import("./LIBRO.js").LIBRO[]}
 */
export function validaLibros(objetos) {
 if (!Array.isArray(objetos))
  throw new Error("no se recibió un arreglo.")
 /**
  * @type {import("./LIBRO.js").LIBRO[]}
  */
 const arreglo = []
 for (const objeto of objetos) {
  arreglo.push(validaLibro(objeto))
 }
 return arreglo
}