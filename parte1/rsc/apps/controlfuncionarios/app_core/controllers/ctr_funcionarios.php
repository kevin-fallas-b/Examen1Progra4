<?php
    require_once(__MDL_PATH."mdl_funcionarios.php");
    require_once(__LIB_PATH."message.php");

    class CTR_funcionarios{
        public function __construct(){
        
        }

        function cargar_view(){
            require_once(__VWS_PATH."funcionarios.php");
        }

    }
?>