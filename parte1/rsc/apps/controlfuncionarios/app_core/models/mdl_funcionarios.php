<?php

    require_once(__CON_PATH."conexion.php");

    class MDL_funcionarios{
        private $conexion;

        public function __CONSTRUCT(){
            $this->conexion = new Conexion();
        }
    }
?>