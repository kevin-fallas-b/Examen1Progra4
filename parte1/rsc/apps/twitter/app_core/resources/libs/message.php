<?php
    require_once(__LIB_PATH . "html.php");
    
    class Message {

        function __construct(){
        }

        public function show_message($text,$type,$reason){

            $ident = rand(1,1000); //identificador unico para cada MSSGBOX
            $message="<div class='msg_box ". $type ."' id='msg_" . $ident . "' ><span>" . Message::messages($reason,$text) . "</span></div>";

            /*<div id='msg_box_container'></div> es el contenedor principal de los mensajes.
            Este elemento es añadido a las páginas que necesita mostrar mensajes al usuario*/  
            //agregamos el MSSBOX al contenedor 

            echo "<script>
                    document.getElementById('msg_box_container').innerHTML += " . json_encode($message) . "; 
                    document.getElementById('msg_".$ident."').style.animation = 'fadein 1s both';
                    document.getElementById('msg_".$ident."').style.animation = 'fadeout 12s both';
                  </script>";
        }

        public function messages($reason,$text){
            $message="";
            
           switch($reason){
             case "success_insert":
               $message="La información ha sido ingresada correctamente";
             break;
             case "success_update":
               $message="La información ha sido actualizada correctamente";
             break;
             case "success_delete":
               $message="La información ha sido eliminada correctamente";
             break;
             case "fail_auth":
               $message="El Usuario o Password suministrados son incorrectos";
             break;
             case "expired_session":
               $message="Su sesión ha expirado, por favor vuelva a ingresar sus datos de autentificación.";
             break;
             case "":
               $message=$text;
             break;
           } 
           return $message;       
        }

    }

?>