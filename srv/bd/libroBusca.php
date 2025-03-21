<?php

require_once __DIR__ . "/../../lib/php/selectFirst.php";
require_once __DIR__ . "/Bd.php";
require_once __DIR__ . "/../modelo/TABLA_LIBRO.php";

/**
 * @return false | array{
 *   LIB_ID: string,
 *   LIB_TITULO: string,
 *   LIB_AUTOR: string,
 *   LIB_ISBN: string,
 *   LIB_EDITORIAL: string,
 *  }
 */
function libroBusca(string $id): false|array
{
 return selectFirst(
  pdo: Bd::pdo(),
  from: LIBRO,
  where: [LIB_ID => $id]
 );
}