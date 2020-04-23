<?php

    require_once(__CON_PATH."conexion.php");

    class MDL_funcionarios{
        private $conexion;

        public function __CONSTRUCT(){
            $this->conexion = new Conexion();
        }

        public function crearfuncionario($nombre, $papellido, $sapellido,$cedula,$fechan,$telefono,$email,$direccion,$departamento,$puesto,$salario,$observaciones){
            echo 'intento guardar';
            $this->conexion->consulta("INSERT INTO `tbl_funcionarios`(`cedula`, `nombre`, `apellido1`, `apellido2`, `fecha`, `telefono`, `email`, `direccion`, `departamento`, `puesto`, `salario`, `observaciones`) VALUES ('$cedula','$nombre','$papellido','$sapellido',$fechan,'$telefono','$email','$direccion','$departamento','$puesto',$salario,'$observaciones')");
        }
    }
?>