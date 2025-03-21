<?php

require_once __DIR__ . "/../../lib/php/select.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_LIBRO.php";

/**
 * Consulta las playeras según los parámetros proporcionados.
 * Los parámetros son opcionales y se aplican solo si son proporcionados.
 *
 * @param string|null $titulo Nombre de la playera a buscar (opcional).
 * @param string|null $autor Talla de la playera a buscar (opcional).
 * @param string|null $isbn Tipo de tela de la playera a buscar (opcional).
 * @param string|null $editorial Color de la playera a buscar (opcional).
 * 
 * @return array{
 *   LIB_ID: string,   // ID del libro
 *   LIB_TITULO: string,  // Nombre del libro
 *   LIB_AUTOR: string,// Autor del libro
 *   LIB_ISBN: string, // ISBN del libro
 *   LIB_EDITORIAL: string // Editorial del libro
 * }[]
 */
function libroConsultaNoEliminados($titulo = null, $autor = null, $isbn = null, $editorial = null)
{
    // Construir el array de condiciones dinámicamente
    $where = [];

    // Solo añadir las condiciones si los valores no son null
    if ($titulo !== null) {
        $where[LIB_TITULO] = $titulo;  // Filtrar por titulo si se proporcionó
    }
    if ($autor !== null) {
        $where[LIB_AUTOR] = $autor;  // Filtrar por autor si se proporcionó
    }
    if ($isbn !== null) {
        $where[LIB_ISBN] = $isbn;    // Filtrar por isbn  si se proporcionó
    }
    if ($editorial !== null) {
        $where[LIB_EDITORAL] = $editorial;  // Filtrar por editorial si se proporcionó
    }

    // Ejecutar la consulta con las condiciones dinámicas
    return select(
        pdo: Bd::pdo(),
        from: LIBRO,
        where: $where, // Pasar las condiciones dinámicas
        orderBy: LIB_TITULO // Ordenar por título del libro
    );
}