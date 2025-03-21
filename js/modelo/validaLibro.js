/**
 * @param { any } objeto
 * @returns {import("./LIBRO.js").LIBRO}
 */
export function validaLibro(objeto) {

    if (typeof objeto.LIB_ID !== "string") 
      throw new Error("El id debe ser texto.")
    
  
    if (typeof objeto.LIB_TITULO !== "string") 
      throw new Error("El título debe ser texto.")
    
  
    if (typeof objeto.LIB_AUTOR !== "string") {
      console.log("Valor de LIB_AUTOR:", objeto.LIB_AUTOR); 
      throw new Error("El autor debe ser texto.");
    }
  
    if (typeof objeto.LIB_ISBN !== "string") 
      throw new Error("El ISBN debe ser número.")
    
  
    if (typeof objeto.LIB_EDITORIAL !== "string") 
      throw new Error("La editorial debe ser texto.")
    
    if (typeof objeto.LIB_MODIFICACION !== "number")
     throw new Error("El campo modificación debe ser número.")
   
    if (typeof objeto.LIB_ELIMINADO !== "number")
     throw new Error("El campo eliminado debe ser número.")
  
    return objeto;
  }
  