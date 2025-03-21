/**
 * @param {string} autor
 */
export function validaAutor(autor) {
    if (autor === "")
     throw new Error("Falta el autor del libro.")
   }