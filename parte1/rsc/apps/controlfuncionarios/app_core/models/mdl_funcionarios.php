<?php

    require_once(__CON_PATH."conexion.php");

    class MDL_funcionarios{
        private $conexion;

        public function __CONSTRUCT(){
            $this->conexion = new Conexion();
        }

        public function actualizar($id,$nombre, $papellido, $sapellido,$cedula,$fechan,$telefono,$email,$direccion,$departamento,$puesto,$salario,$observaciones,$foto, $nombrefoto){
            $this->conexion->consulta("UPDATE `tbl_funcionarios` SET `cedula` = '$cedula', `nombre` = '$nombre', `apellido1`= '$papellido', `apellido2` = '$sapellido', `fecha` = $fechan, `telefono` = '$telefono', `email` = '$email', `direccion` = '$email', `departamento` = '$departamento', `puesto` = '$puesto', `salario` = $salario, `observaciones` = '$observaciones' ,`foto` = '$nombrefoto' WHERE id=".$id);
            $this->guardarimagen($foto,$nombrefoto);
        }

        public function crearfuncionario($nombre, $papellido, $sapellido,$cedula,$fechan,$telefono,$email,$direccion,$departamento,$puesto,$salario,$observaciones,$foto, $nombrefoto){
            $this->conexion->consulta("INSERT INTO `tbl_funcionarios`(`cedula`, `nombre`, `apellido1`, `apellido2`, `fecha`, `telefono`, `email`, `direccion`, `departamento`, `puesto`, `salario`, `observaciones`, `foto`) VALUES ('$cedula','$nombre','$papellido','$sapellido',$fechan,'$telefono','$email','$direccion','$departamento','$puesto',$salario,'$observaciones','$nombrefoto')");
            $this->guardarimagen($foto,$nombrefoto);
        }

        public function eliminar($id){
            $this->conexion->consulta("DELETE FROM tbl_funcionarios
            WHERE id in(".$id.")");
        }

        public function buscar($datapost = array()){
            $this->conexion->consulta("SELECT id, cedula, nombre, apellido1, apellido2, fecha, telefono, email, direccion, departamento, puesto, salario, observaciones, foto FROM `tbl_funcionarios` WHERE nombre LIKE '%".$datapost[0]."%' OR apellido1 LIKE '%".$datapost[0]."%' OR apellido2 LIKE '%".$datapost[0]."%'  order by id DESC");
            $datos = "";
            $contposts=0;

            //extraer todos los registros y meterlos en un array
            $registros = [];
            while($fila = $this->conexion->extraer_registro()){
                array_push($registros,$fila);
            }
            
            //ponerlos en pantalla
            for($i= 0; $i< count($registros);$i++){
                $fila = $registros[$i];
                $nombrefoto=$fila[1];
                if($fila[1][strlen($fila[1])-1] == "-"){
                    $nombrefoto=substr($fila[1], 0, -1);
                    $fila[1]="<img src='".__RSC_FLE_HOST_PATH.$nombrefoto."'class='imagenpost'>";
                    $imagen=true;
                }
                
                $datos .= "<button class='accordion' value='$fila[0]'>$fila[2] $fila[3] $fila[4] </button>
                <div class='panel'>
                    <img src='app_core/resources/images/$fila[13]' class='imgfuncpanel fotofun'>
                    <div class='informacionpersonal'>
                        <h2>Datos Personales</h2>
                        <h3>Nombre:</h3> <label class='nombrefun'> $fila[2]</label> <br><br>
                        <h3>Apellidos:</h3> <label class='papellidofun'>$fila[3] </label><label class='sapellidofun'>$fila[4]</label><br><br>
                        <h3>Cedula:</h3> <label class='cedulafun'>$fila[1] </label><br><br>
                        <h3>Fecha de nacimiento:</h3> <label class='fechanfun'>$fila[5]</label> <br><br>
                    </div>
                    <div class='informacionlaboral'>
                        <h2>Datos Laborales</h2>
                        <h3>Telefono:</h3> <label class='telefonofun'>$fila[6]</label> <br><br>
                        <h3>Email:</h3> <label class='emailfun'>$fila[7]</label> <br><br>
                        <h3>Direccion:</h3> <label class='direccionfun'>$fila[8]</label> <br><br>
                        <h3>Departamento:</h3> <label class='departamentofun'>$fila[9]</label> <br><br>
                        <h3>Puesto:</h3> <label class='puestofun'>$fila[10]</label> <br><br>
                        <h3>Salario (mensual):</h3>‎ ₡<label class='salariofun'>$fila[11]</label> <br><br>
                        <h3>Observaciones:</h3> <textarea cols='30' rows='10' readonly class='observacionesfun'> $fila[12] </textarea><br>
                    </div>
                    <div>
                    <button type='button' class='editar' onclick='editar(".$fila[0].")'>Editar</button>
                    <button type='button' class='eliminar' onclick='eliminar(".$fila[0].")'>Eliminar</button>
                    </div>
                </div>";

                
            $contposts++;
            
            }
            $datos.="<div id='mensajecancelar'>
            Para cancelar presione la tecla escape.
            </div>";
            return $datos;
        }

        public function guardarimagen($imagen,$nombrefoto){
            $directorio = str_replace('/', '\\',  __RSC_PATH)."images\\"; //tenia un problema que el path resultaba con \/ entonces se quitan los / y se pone otro \ para evitar errores de que no existe el directorio
            move_uploaded_file($imagen['tmp_name'],$directorio.$nombrefoto);
            
        }
    }
?>