<?php

  require_once("global.php"); //ARCHIVO BÁSICO GLOBAL DE CONFIGURACIÓN
  require_once(__LIB_PATH . "html.php");
  require_once(__CTR_PATH . "ctr_twitter.php");

  $html = new HTML(); //Invocamos al html helper
  $twitter = new CTR_twitter(); //Invocamos al controlador
?>

<!DOCTYPE HTML>
<html>

  <head>

    <meta name="title" content="Twitter " />
    <meta name="description" content="Twitter example" />
    <meta name="robots" content="index, follow" />
    <meta name="keywords" content="Social Network, HTML5, PHP, MySQL, jquery" />
    <meta name="language" content="es" />
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    
    <link rel="shortcut icon" href="favicon.ico"/>

      <?php
          echo $html->html_js_header(__JS_PATH . "funciones.js"); 
          echo $html->html_css_header(__CSS_PATH . "style.css","screen"); 
      ?>

    <title>My Twitter</title>
  </head>

  <body id="main_page">
  
    <div id='msg_box_container'></div>
  	<div id="main_box">

      <?php
        //Incluimos la vista contenida dentro del controlador respectivo
        $twitter->cargar_view();    
      ?>

    </div>
    
  </body>
</html>


