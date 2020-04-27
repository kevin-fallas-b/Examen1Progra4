<?php
    error_reporting(E_ALL); ini_set("display_errors",1);
    require_once("mantenimiento.php");

    $message= "";
    if(isset($_POST["guardar"])){
        $codigo =  $_POST["txt_cod"];
        $nombre =  $_POST["txt_nom"];
        $precio =  $_POST["txt_prec"];
        $cantidad =  $_POST["txt_cant"];
        $proveedor = $_POST["txt_pro"];
        $fechav = $_POST["txt_fechav"];
        insertarProductos($conexion, $codigo, $nombre, $precio, $cantidad,$proveedor,$fechav);
    }

    if(isset($_POST["btn_eliminar"])){
        $codigo = $_POST["txt_cod"];
        $message = eliminarProducto($conexion,$codigo);
    }
?>

<!DOCTYPE html>
<head>
	<meta charset='utf-8'> <!-- Codificación de documento para uso de caracteres -->
    <title>inventario Examen</title>
    <link rel='stylesheet' href='css/styles.css'>
    <link rel="stylesheet" href="css/alertify.min.css" />
    <link rel="stylesheet" href="css/themes/default.min.css" />

    <script type="text/javascript" src="js/axios.min.js"></script>
    <script type='text/javascript' src='js/Chart.min.js'> </script>
    <script src="js/alertify.min.js"></script>
    <script type="text/javascript" src="js/funciones.js"></script>
</head>
<body>

<?php 
    echo ($message!="")? "<script> alertify.set('notifier','position','top-right'); alertify.$tipomensaje('$message');</script>" : "";
?>
<section id="panel_form"> 
    <form method="post" id="frm_productos" name="frm_productos" action="formulario.php"> 
        <div class="filacampos">
        <label>Codigo:</label> 
        <input type="text" class="campo_texto" maxlength="8" value="" tabindex="1" id="txt_cod" name="txt_cod" required> 
        <label>Nombre:</label> 
        <input type="text" class="campo_texto" maxlength="64" value="" tabindex="2" id="txt_nom" name="txt_nom" > 
        </div>
        <div class="filacampos">
        <label>Precio:</label> 
        <input type="number" class="campo_texto" maxlength="11" value="" tabindex="3" id="txt_prec" name="txt_prec" > 
        <label>Cantidad:</label> 
        <input type="number" class="campo_texto" maxlength="11" value="" tabindex="4" id="txt_cant" name="txt_cant" > 
        </div>
        <div class="filacampos">
        <label>Proveedor: </label> 
        <input type="text" class="campo_texto" maxlength="100" value="" tabindex="5" id="txt_pro" name="txt_pro">
        <label>Fecha de vencimiento:</label> 
        <input type="text" class="campo_texto" maxlength="30" value="" tabindex="6" id="txt_fechav" name="txt_fechav">
        </div>
          
        <button type="button" name="btn_guardar" id="btn_guardar" tabindex="7">Guardar</button> 
        <button type="submit" name="btn_eliminar" id="btn_eliminar" tabindex="8">Eliminar</button>
        <button type="button" name="btn_eliminarajax" id="btn_eliminarajax" tabindex="8">Eliminar (Ajax)</button>  
    </form> 
</section> 
 
<section id="panel_data"> 
    <form method="post" id="frm_busqueda" name="frm_busqueda"> 
        <input type="text" value="" placeholder="Buscar por Nombre o Código del Producto"  
        size="50" name="txt_busq" id="txt_busq" class="search" tabindex="9" onkeyup="cargarProductos(this.value)"> 
    </form> 
    <br><br> 
    <div id="resultados"> 
        <table id="tabla"> 
            <thead><td>CÓDIGO</td><td>NOMBRE</td><td>PRECIO</td><td>CANTIDAD</td><td>PROVEEDOR</td><td>FECHA DE VENCIMIENTO</td></thead> 
            <tbody id="grid"> 
            <?php
                echo obtenerProductos();
            ?>
            </tbody> 
        </table> 
    </div>
    
   
</section>

<section id='contenedorcanvas'>
    <canvas id='canvasgraficos'>

    </canvas>
    <div id='opciones'>
        <div>
        <input type="checkbox" id="tipoprecio" name="tipoprecio" checked value="precio">
        <label for="tipoprecio">Precio por producto</label><br>
        <input type="checkbox" id="tipocantidad" name="tipocantidad" value="cantidad">
        <label for="tipocantidad">Cantidad de productos</label><br>
        </div>
        <div >
        <input type="checkbox" id="barras" name="barras" checked value="bar">
        <label for="barras">Grafico de barras</label><br>
        <input type="checkbox" id="lineal" name="lineal" value="line">
        <label for="lineal">Grafico Lineal</label><br>
    </div>
    </div>
    <input type="button" id='generargrafico' value="Generar grafico">
</section>
</body>
</html>



