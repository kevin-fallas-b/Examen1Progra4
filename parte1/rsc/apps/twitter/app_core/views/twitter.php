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
        <?php echo $html->html_input_button("button","btn_subirimagen","btn_subirimagen","boton","Subir imagen",2,"","");?>
        <input id="escogerimagen" type="file" accept="image/*" name="escogerimagen" style="display: none;" />
        </div>
        <?php echo $html->html_form_end();?>
    </div>

    <div id="main_panel">
        <?php
        $caja_post="";
        $contposts=0;

        foreach($twitter->obtener_tweets() as $value){
            $nombrefoto=$value[1];
            $imagen=false;
            //revisar si es imagen
            if($value[1][strlen($value[1])-1] == "-"){
                $nombrefoto=substr($value[1], 0, -1);
                $value[1]="<img src='".__RSC_FLE_HOST_PATH.$nombrefoto."' class='imagenpost'>";
                $imagen=true;
            }

            $caja_post.= "<div class='post_block'>
                            <button type='button' class='eliminar' onclick='eliminar(".$value[0].")'>Eliminar</button>".
                            "<button type='button' class='responder' onclick='responder(".$value[0].")'>Responder</button>";
                            if(!$imagen){//si no es imagen agrega boton de editar
                                $caja_post.="<button type='button' class='editar' onclick='editar(".$value[0].",\"".$nombrefoto."\")'>Editar</button>";
                            } 
                            
            $caja_post.= "<span class='post_text' id='post_".$value[0]."'>
                                <div class='published_date'>
                                    <span>publicado el ".$value[2]."</span>
                                </div>
                            </span>
                            <div id='content_post_".$contposts."'>
                                <div class='post_detail'>".$value[1]."</div><br/>
                             </div>
                            </div> ";
            $contposts++;
        }

        echo $caja_post;
        ?>
    </div>
</div>