<?php
    require_once(__LIB_PATH ."html.php");
    $html = new HTML();
    $funcionarios = new CTR_funcionarios();

    if(isset($_POST['guardar'])){
        $funcionarios->guardar();
    }

    if(isset($_POST['actualizar'])){
        $funcionarios->actualizar();
    }
?>


<div id='panel_app'><!--este div es casi que la pantalla completa-->
    <div id='box_formulario'><!--este div es la parte superior, donde estan todos los campos para editar informacion-->
        <div id='contenedorfoto'>
            <img src="app_core/resources/images/user.png" alt="" class='imgfunc'>
            <input type="button" id='btncambiarimg' class='boton' value='Cambiar'>
        </div>
        <div id='datospersonales'>
            <label id='lbldatospersonales'>Datos Personales:</label>
            <input type="text" class='cajatexto' id='nombre' placeholder="Nombre">
            <input type="text" class='cajatexto' id='papellido' placeholder="Primer Apellido">
            <input type="text" class='cajatexto' id='sapellido' placeholder="Segundo Apellido">
            <input type="text" class='cajatexto' id='cedula' placeholder="Cedula">
            <input type="text" class='cajatexto' id='fechan' placeholder="Fecha de Nacimiento">
        </div>
        <div id='datostrabajo'>
            <label id='lbldatospersonales'>Datos Laborales:</label>
            <input type="text" class='cajatexto' id='telefono' placeholder="Telefono">
            <input type="text" class='cajatexto' id='email' placeholder="Email">
            <input type="text" class='cajatexto' id='direccion' placeholder="Direccion">
            <input type="text" class='cajatexto' id='departamento' placeholder="Departamento">
            <input type="text" class='cajatexto' id='puesto' placeholder="Puesto">
            <input type="text" class='cajatexto' id='salario' placeholder="Salario">
            <input type="text" class='cajatexto' id='observaciones' placeholder="Observaciones">
        </div>
        <div id='areacontroles'>
            <textarea name="" id="txtbuscar" cols="6" rows="4" placeholder='Buscar Funcionario' class='cajatexto'></textarea>
            <input type="button" id='btnguardar' class='boton' value='Guardar'>
        </div>
    </div>

    <div id='main_panel'> <!--este div es el area donde se va a tener el acordion con la informacion de cada funcionario-->

    </div>
</div>