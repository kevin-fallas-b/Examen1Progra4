<?php
    require_once(__MDL_PATH."mdl_funcionarios.php");
    require_once(__LIB_PATH."message.php");

    class CTR_funcionarios{

        private $modelo;

        public function __construct(){
           $this->modelo = new MDL_funcionarios(); 
        }

        function cargar_view(){
            require_once(__VWS_PATH."funcionarios.php");
        }

        public function guardar(){
            $this->modelo->crearfuncionario($_POST['nombre'],$_POST['papellido'],$_POST['sapellido'],$_POST['cedula'],$_POST['fechan'],$_POST['telefono'],$_POST['email'],$_POST['direccion'],$_POST['departamento'],$_POST['puesto'],$_POST['salario'],$_POST['observaciones']);
        }

        public function actualizar(){

        }
    }
?>