<?php
/*          _\|/_
            (0 0)
--------o00o-{_}-o00o-----------------------

ARCHIVO DE CONFIGURACIÓN GLOBAL.
--------------------------------------------
/\/\
(0_0)
(>  )> 
 V V
*/

  // ------ Variables que definen el nombre actual del hosting -------

  $myhost="http://localhost";
  $myproject="progra4/examen1/parte1/rsc/apps/twitter";
  $mysite=$myhost . "/" . $myproject;

  date_default_timezone_set('America/Costa_Rica');

   // ------ Variables estáticas que definen las rutas absolutas del proyecto -------
  define('__ROOT__', $_SERVER["DOCUMENT_ROOT"]);
  define('__SITE_PATH', $mysite);

  define('__CON_PATH', "app_core/bd/");
  define('__MDL_PATH', "app_core/models/");
  define('__CTR_PATH', "app_core/controllers/");
  define('__VWS_PATH', __ROOT__ . "/" . $myproject . "/app_core/views/");
  define('__VWS_HOST_PATH', $mysite . "/app_core/views/");
  define('__CTR_HOST_PATH', $mysite . "/app_core/controllers/");
   define('__LIB_PATH', "app_core/resources/libs/");

  define('__RSC_PATH', __ROOT__ ."/".$myproject."/app_core/resources/");
  define('__RSC_HOST_PATH', $mysite . "/app_core/resources/");
  define('__RSC_PHO_HOST_PATH', $mysite . "/app_core/resources/photos/");
  define('__RSC_FLE_HOST_PATH', $mysite . "/app_core/resources/files/");
  define('__RSC_TBN_HOST_PATH', $mysite . "/app_core/resources/thumbnails/");
  define('__RSC_IMG_HOST_PATH', $mysite . "/app_core/resources/images/");

  define('__JS_PATH', $mysite . "/app_design/js/");
  define('__CSS_PATH', $mysite . "/app_design/css/");
  define('__IMG_PATH', $mysite . "/app_design/img/");


// ************************* GLOBAL FUNCTIONS *********************** //

  set_error_handler("my_error_handler", E_ALL);

  require_once(__LIB_PATH . "message.php");

  /*my_error_handler: Maneja globalmente los warnings y excepciones de PHP y los muestra en
  un message box personalizado.*/

  function my_error_handler($errno, $errstr, $errfile, $errline, $errcontext)
  {
     try{
        $mssg = new Message();
        throw new Exception($errstr);
     }catch(Exception $e){
        $mssg->show_message("Error: " . $errstr . " <br> File: " . $errfile . "  <br> Line: " . $errline, "error", "");
     }
  }
  
?>