<?php

function recuperaJson() {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    if ($data === null) {
        throw new Exception("Error al decodificar JSON");
    }
    return $data;
}
