<?php

require_once __DIR__ . "/../../lib/php/validaTitulo.php";
require_once __DIR__ . "/../../lib/php/update.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_LIBRO.php";
require_once __DIR__ . "/../modelo/validaId.php";

/**
 * @param array{
 *   PLA_ID: string,
 *   PLA_NOM: string,
 *   PLA_TALLA: string,
 *   PLA_TELA: string,
 *   PLA_COLOR: string,
 *  } $modelo
 */
function libroModifica(array $modelo)
{
 validaId($modelo[LIB_ID]);
 validaTitulo($modelo[LIB_TITULO]);
 validaAutor($modelo[LIB_AUTOR]);
 validaIsbn($modelo[LIB_ISBN]);
 validaEditorial($modelo[LIB_EDITORAL]);
 update(
  pdo: Bd::pdo(),
  table: LIBRO,
  set: $modelo,
  where: [LIB_ID => $modelo[LIB_ID]]
 );
}