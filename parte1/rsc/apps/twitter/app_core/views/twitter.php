<?php
    require_once(__LIB_PATH ."html.php");
    $html = new HTML();
    $twitter = new CTR_twitter();

    if(isset($_POST['btn_save'])){
        $twitter->btn_save_click();
    }

    if(isset($_POST['btn_eliminar'])){
        $twitter->eliminar();
    }

    if(isset($_POST['btn_actualizar'])){
        $twitter->btn_actualizar_post();
        echo "actualizo correctamente";
    }

    if(isset($_GET["datobusqueda"])){
        die($twitter->buscar());
    }
    
    if(isset($_POST["subirimagen"])){
        $twitter->guardarimagen();
        die();
    }

?>

<div id="panel_app">
    <div id="user_box">
    </div>

    <div id="post_box">
        <?php echo $html->html_form_tag("frm_service","","","post");?>
        <br>
        <?php echo $html->html_textarea(4,6,"txt_post","txt_post","cajatexto","",1,"","placeholder='Escribe algo!'","required");?>
        <br><br>
        <?php echo $html->html_textarea(4,6,"txt_buscar","txt_buscar","cajatexto ","",1,"","placeholder='Busqueda' onkeyup='buscar(this.value)'","");?>
        <div id="botonesBuscar">
        <?php echo $html->html_input_button("button","btn_saveajax","btn_saveajax","boton","Publicar con ajax",2,"","");?>
        </div>
        <?php echo $html->html_form_end();?>
    </div>

    <div id="main_panel">
        <div id='mensajecancelar'>
            Para cancelar presione la tecla escape.
        </div>
        <?php
        echo file_get_contents('http://localhost/progra4/examen1/parte1/rsc/apps/twitter/index.php?datobusqueda=+');
        ?>
    </div>
</div>