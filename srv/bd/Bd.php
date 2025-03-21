<?php

class Bd
{

 private static ?PDO $pdo = null;

 static function pdo(): PDO
 {
  if (self::$pdo === null) {
   self::$pdo = new PDO(
    // cadena de conexión
    "sqlite:sincronizacion.db",
    // usuario
    null,
    // contraseña
    null,
    // Opciones: pdos no persistentes y lanza excepciones.
    [PDO::ATTR_PERSISTENT => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
   );

   self::$pdo->exec(
    'CREATE TABLE IF NOT EXISTS LIBRO (
      LIB_ID TEXT NOT NULL,
      LIB_TITULO TEXT NOT NULL,
      LIB_AUTOR TEXT NOT NULL,
      LIB_ISBN TEXT NOT NULL,
      LIB_EDITORIAL TEXT NOT NULL,
      LIB_MODIFICACION INTEGER NOT NULL,
      LIB_ELIMINADO INTEGER NOT NULL,
      CONSTRAINT LIB_PK
       PRIMARY KEY(LIB_ID),
      CONSTRAINT LIB_ID_NV
       CHECK(LENGTH(LIB_ID) > 0),
      CONSTRAINT LIB_TITULO_NV
       CHECK(LENGTH(LIB_TITULO) > 0)
     )'
   );
  }

  return self::$pdo;
 }
}