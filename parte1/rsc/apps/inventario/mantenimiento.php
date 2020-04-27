<?php

    error_reporting(E_ALL); ini_set("display errors",1);

    require_once("conexion.php");


    $servidor = 'localhost';
    $usuario ='root';
    $pass = '';
    $base_datos = 'bd_productos'; 
    $conexion = new Conexion();
    $tipomensaje = "success";

    function obtenerProductos(){
        $conexion = new Conexion();
        $conexion->consulta ("select  * FROM tbl_productos ORDER BY id DESC");
        $datos = "";

        while($fila = $conexion->extraer_registro()){
            $datos .= "<tr><td>$fila[1]</td><td>$fila[2]</td><td>$fila[3]</td><td>$fila[4]</td><td>$fila[6]</td><td>$fila[5]</td></tr>";
        }
        return $datos;
    }


    function buscarProductos($conexion, $dato){ 
        $conexion->consulta ("SELECT * FROM tbl_productos WHERE codigo LIKE '%$dato%' OR nombre LIKE '%$dato%' ORDER BY id DESC "); 
        $resultado=""; 
 
        while ($fila = $conexion->extraer_registro() ) {
                $resultado .= "<tr ><td>$fila[1]</td><td>$fila[2]</td><td>$fila[3]</td><td>$fila[4]</td><td>$fila[6]</td><td>$fila[5]</td></tr>"; 
        } 
        echo $resultado; //imprimimos los datos 
    } 
 
    function insertarProductos($conexion,$codigo,$nombre,$precio,$cantidad,$proveedor,$fechav){ 
        //INSERTAR - ACTUALIZAR - Comprobamos que el código existe buscándolo primero 
        if(validar($codigo,$nombre,$precio,$cantidad,$proveedor,$fechav)){
            $conexion->consulta ("SELECT codigo FROM tbl_productos WHERE codigo = '$codigo' "); 
 
            if($conexion->extraer_registro()){ //SI EXISTE EL CODIGO LO ACTUALIZA 
                $actualizar = "UPDATE tbl_productos SET nombre='$nombre', precio=$precio, cantidad=$cantidad, proveedor='$proveedor', fechavencimiento='$fechav' WHERE codigo = '$codigo' "; 
 
                 $conexion->consulta($actualizar); 
                 $tipomensaje = "success";
                 buscarProductos($conexion, "");
                return "Registro actualizado exitosamente."; 
 
            }else{ //SI NO EXISTE EL CODIGO LO INSERTA 
 
                $insertar = "INSERT INTO tbl_productos (codigo,nombre,precio,cantidad,fechavencimiento,proveedor) VALUES('$codigo','$nombre',$precio,$cantidad,'$fechav','$proveedor')"; 
 
                $conexion->consulta($insertar); 
                $tipomensaje = "success";
                //buscarProductos($conexion, "");
                return "Registro insertado exitosamente."; 
            }
        }else{
            $tipomensaje = "error";
            return "No se pudo guardar. Por favor revise los campos.";
        } 
    } 
    
    function eliminarProducto($conexion, $codigo){
        $conexion->consulta ("SELECT codigo FROM tbl_productos WHERE codigo = '$codigo' ");
        if($conexion->extraer_registro()){
            $eliminar = " DELETE from tbl_productos where codigo ='$codigo'";
            $conexion->consulta($eliminar);
            $tipomensaje = "success";
            return "Articulo eliminado correctamente";
        }else{
            $tipomensaje='error';
            return "No existe un producto con el codigo ingresado.";
        }
    }

    if(isset($_GET["datobusqueda"])){
        buscarProductos($conexion,$_GET["datobusqueda"]);
    }    


    function validar($codigo,$nombre,$precio,$cantidad,$proveedor,$fechav){
        $todobien=true;
        if(empty($codigo) || empty($nombre) || empty($precio) || empty($cantidad) || empty($proveedor) || empty($fechav) || (validarint($precio) && validarint($cantidad) == false)){
            $todobien = false;
        }
        return $todobien;
    }

    function validarint($val){
        $val = filter_var($val, FILTER_VALIDATE_INT);
		if ($val === false) {
			return false;
		}
		return true;
    }

    function limpiarCampos(){

    }
?>