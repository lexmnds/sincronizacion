<?php

require_once __DIR__ . "/../../lib/php/BAD_REQUEST.php";
require_once __DIR__ . "/../../lib/php/validaJson.php";
require_once __DIR__ . "/../../lib/php/ProblemDetails.php";
require_once __DIR__ . "/TABLA_LIBRO.php";

function validaLibro($objeto)
{

 $objeto = validaJson($objeto);

 if (!isset($objeto->LIB_ID) || !is_string($objeto->LIB_ID))
 throw new ProblemDetails(
     status: BAD_REQUEST,
     title: "El id debe ser texto.",
     type: "/error/idincorrecto.html"
 );

// Validación de LIB_TITULO
if (!isset($objeto->LIB_TITULO) || !is_string($objeto->LIB_TITULO))
 throw new ProblemDetails(
     status: BAD_REQUEST,
     title: "El título debe ser texto.",
     type: "/error/tituloincorrecto.html"
 );

// Validación de LIB_AUTOR
if (!isset($objeto->LIB_AUTOR) || !is_string($objeto->LIB_AUTOR))
 throw new ProblemDetails(
     status: BAD_REQUEST,
     title: "el autor debe ser texto.",
     type: "/error/tituloincorrecto.html"
 );

// Validación de LIB_ISBN
if (!isset($objeto->LIB_ISBN) || !is_string($objeto->LIB_ISBN))
 throw new ProblemDetails(
     status: BAD_REQUEST,
     title: "El ISBN debe ser texto.",
     type: "/error/tituloincorrecto.html"
 );

// Validación de LIB_EDITORIAL
if (!isset($objeto->LIB_EDITORIAL) || !is_string($objeto->LIB_EDITORIAL))
 throw new ProblemDetails(
     status: BAD_REQUEST,
     title: "La editorial debe ser texto.",
     type: "/error/tituloincorrecto.html"
 );

 if (!isset($objeto->LIB_MODIFICACION)  || !is_int($objeto->LIB_MODIFICACION))
 throw new ProblemDetails(
  status: BAD_REQUEST,
  title: "La modificacion debe ser número.",
  type: "/error/modificacionincorrecta.html",
 );

 if (!isset($objeto->LIB_ELIMINADO) || !is_int($objeto->LIB_ELIMINADO))
 throw new ProblemDetails(
  status: BAD_REQUEST,
  title: "El campo eliminado debe ser entero.",
  type: "/error/eliminadoincorrecto.html",
 );

// Si todas las validaciones son correctas, retornamos los valores del objeto.
return [
 LIB_ID => $objeto->LIB_ID,
 LIB_TITULO => $objeto->LIB_TITULO,
 LIB_AUTOR => $objeto->LIB_AUTOR,
 LIB_ISBN => $objeto->LIB_ISBN,
 LIB_EDITORAL => $objeto->LIB_EDITORIAL,
 LIB_MODIFICACION => $objeto->LIB_MODIFICACION,
 LIB_ELIMINADO => $objeto->LIB_ELIMINADO
];
}