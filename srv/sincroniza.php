<?php

require_once __DIR__ . "/../lib/php/ejecutaServicio.php";
require_once __DIR__ . "/../lib/php/recuperaJson.php";
require_once __DIR__ . "/../lib/php/devuelveJson.php";
require_once __DIR__ . "/../lib/php/ProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveProblemDetails.php";
require_once __DIR__ . "/../lib/php/devuelveErrorInterno.php";
require_once __DIR__ . "/modelo/TABLA_LIBRO.php";
require_once __DIR__ . "/modelo/validaLibro.php";
require_once __DIR__ . "/bd/libroAgrega.php";
require_once __DIR__ . "/bd/libroBusca.php";
require_once __DIR__ . "/bd/libroConsultaNoEliminados.php";
require_once __DIR__ . "/bd/libroModifica.php";

ejecutaServicio(function () {

 $lista = recuperaJson();

 if (!is_array($lista)) {
  $lista = [];
 }

 foreach ($lista as $modelo) {
  $modeloEnElCliente = validaLibro($modelo);
  $modeloEnElServidor = libroBusca($modeloEnElCliente[LIB_ID]);

  if ($modeloEnElServidor === false) {

   /* CONFLICTO: El modelo no ha estado en el servidor.
    * AGREGARLO solamente si no está eliminado. */
   if ($modeloEnElCliente[LIB_ELIMINADO] === 0) {
    libroAgrega($modeloEnElCliente);
   }
  } elseif (
   $modeloEnElServidor[LIB_ELIMINADO] === 0
   && $modeloEnElCliente[LIB_ELIMINADO] === 1
  ) {

   /* CONFLICTO: El registro está en el servidor, donde no se ha eliminado, pero
    * ha sido eliminado en el cliente.
    * Gana el cliente, porque optamos por no revivir lo eliminado. */
   libroModifica($modeloEnElCliente);
  } else if (
   $modeloEnElCliente[LIB_ELIMINADO] === 0
   && $modeloEnElServidor[LIB_ELIMINADO] === 0
  ) {

   /* CONFLICTO: Registros en el servidor y en el cliente. Pueden ser
    * diferentes.
    * GANA FECHA MÁS GRANDE. Cuando gana el servidor, no se hace nada. */
   if (
    $modeloEnElCliente[LIB_MODIFICACION] >
    $modeloEnElServidor[LIB_MODIFICACION]
   ) {
    // La versión del cliente es más nueva y prevalece.
    libroModifica($modeloEnElCliente);
   }
  }
 }

 $lista = libroConsultaNoEliminados();

 devuelveJson($lista);
});
