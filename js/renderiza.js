import { exportaAHtml } from "../lib/js/exportaAHtml.js"
import { htmlentities } from "../lib/js/htmlentities.js"

/**
 * @param {HTMLUListElement} lista
 * @param {import("./modelo/LIBRO.js").LIBRO[]} libros
 */
export function renderiza(lista, libros) {
  let render = ""
  for (const modelo of libros) {
    if (modelo.LIB_ID === undefined)
      throw new Error(`Falta LIB_ID de ${modelo.LIB_TITULO}.`)
    
    // Escapar las propiedades para evitar inyecciones
    const titulo = htmlentities(modelo.LIB_TITULO)
    const autor = htmlentities(modelo.LIB_AUTOR)
    const isbn = htmlentities(modelo.LIB_ISBN)
    const editorial = htmlentities(modelo.LIB_EDITORIAL)

    // Crear los parámetros de búsqueda para el enlace
    const searchParams = new URLSearchParams([["id", modelo.LIB_ID]])
    const params = htmlentities(searchParams.toString())

    // Generación del HTML de forma segura
    render += `
      <li class="md-two-line image">
        <img alt="Icono de Libro" src="img/icono2048.png">
        <p><a href="modifica.html?${params}"><span class="headline">${titulo}</span></a></p>
        <span class="supporting">Autor: ${autor}, ISBN: ${isbn}, Editorial: ${editorial}</span>
      </li>`
  }

  // Inyectar el HTML generado en el contenedor
  lista.innerHTML = render
}

exportaAHtml(renderiza)