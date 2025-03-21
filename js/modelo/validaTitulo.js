/**
 * @param {string} titulo
 */
export function validaTitulo(titulo) {
    if (titulo === "")
     throw new Error("Falta el título del libro.")
   }