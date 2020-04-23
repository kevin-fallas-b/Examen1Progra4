<?php

    require_once(__CON_PATH."conexion.php");

    class MDL_twitter{
        
        private $conexion;

        public function __CONSTRUCT(){
            $this->conexion = new Conexion();
        }

        public function get_tweets(){
            $this->conexion->consulta(
                "SELECT tbl_posts.id, tbl_posts.post, tbl_posts.date, tbl_post.idresp
                FROM tbl_posts
                ORDER BY tbl_posts.id DESC"
            );
            $posts = array();
            $num_fila=0;

            while ($fila = $this->conexion->extraer_registro()){
                $posts[$num_fila][0] = $fila[0];
                $posts[$num_fila][1] = $fila[1];
                $posts[$num_fila][2] = $fila[2];
                $num_fila++;
            }

            return $posts;
        }


        public function insertar_post($datospost = array()){
            $this->conexion->consulta(
                "INSERT INTO tbl_posts (post, date, idresp)
                VALUES ('".$datospost[0]."','" . date('Y-m-d H:i:s') . "',$datospost[1])");
        }

        public function eliminar($id){
            $this->conexion->consulta("DELETE FROM tbl_posts
            WHERE id in(".$id.")");
        }

        public function actualizar($id, $datospost = array()){
            $this->conexion->consulta("UPDATE tbl_posts SET post = '".$datospost[0]."' WHERE id=".$id);
           
        }

        

        public function buscar($datapost = array()){
            $this->conexion->consulta("SELECT id, post, date,idresp FROM `tbl_posts` WHERE post LIKE '%".$datapost[0]."%' order by id DESC");
            $datos = "";
            $contposts=0;

            //extraer todos los registros y meterlos en un array
            $posts = [];
            while($fila = $this->conexion->extraer_registro()){
                array_push($posts,$fila);
            }
            //llamar metodo que me los ordena
            $postsAcomodados = $this->acomodarTweets($posts);
            
            //ponerlos en pantalla
            $respuestaNum =0; //sirve para saber que tanto indentar la respuesta
            for($i=count($postsAcomodados)-1; $i>=0;$i--){
                $fila = $postsAcomodados[$i];
                $nombrefoto=$fila[1];
                $imagen=false;

                //encontrar que tanto indentar si es una respuesta
                $filaAux = $fila;
                $seguir = true;
                while($seguir){
                    
                    $seguir = false;
                    for($k =0; $k<count($postsAcomodados);$k++){
                        if($postsAcomodados[$k][0] == $filaAux[3]){
                            $filaAux = $postsAcomodados[$k];
                            $respuestaNum++;  
                            $seguir = true;    
                        break;
                        }
                    }    
                }
                
                if($fila[1][strlen($fila[1])-1] == "-"){
                    $nombrefoto=substr($fila[1], 0, -1);
                    $fila[1]="<img src='".__RSC_FLE_HOST_PATH.$nombrefoto."'class='imagenpost'>";
                    $imagen=true;
                }
                
                $datos .= "<div class='post_block$respuestaNum' id='mensajeid$fila[0]' data-value='$fila[3]'>
                <button type='button' class='eliminar' onclick='eliminar(".$fila[0].")'>Eliminar</button>";
                if($respuestaNum<3){
                   $datos.="<button type='button' class='responder' onclick='responder(".$fila[0].")'>Responder</button>";
                }
                if(!$imagen){//si no es imagen agrega boton de editar
                    $datos.="<button type='button' class='editar' onclick='editar(".$fila[0].",\"".$nombrefoto."\")'>Editar</button>";
                } 
                $datos.="<span class='post_text' id='post_" .$fila[0]."'>
                    <div class='published_date'>
                        <span>publicado el ".$fila[2]."</span>
                    </div>
                </span>
                <div id='content_post_".$contposts."'>
                     <div class='post_detail'>".$fila[1]. "</div><br/>
                </div>
            </div> ";
            $contposts++;
            $respuestaNum=0;
            }
            return $datos;

        }

        public function guardarimagen($imagen){
            $nombrefoto = $imagen['name'];
            $directorio = str_replace('/', '\\',  __RSC_PATH)."files\\"; //tenia un problema que el path resultaba con \/ entonces se quitan los / y se pone otro \ para evitar errores de que no existe el directorio
            while(file_exists($directorio.$nombrefoto)){
                //revisar si nombre ya existe, si ya existe, le agregamos un (1) al final
                $partes = array();
                $partes = explode(".",$nombrefoto);
                $partes[count($partes)-2].="(1)";//al final del archivo, antes de la extension agregamos (1). Preever casos como nombre.de.foto.con.puntos.jpg
                $nombrefoto="";
                for($i=0; $i<count($partes);$i++){
                    $nombrefoto.=$partes[$i].".";
                }
                $nombrefoto =substr($nombrefoto, 0, -1);
            }
            move_uploaded_file($imagen['tmp_name'],$directorio.$nombrefoto);
            //ya guardamos la imagen, ahora guardar el post con tags de imagen
            $contenidopost = array();
            $contenidopost[0] = $nombrefoto."-";//se le agrega un - al final de la imagen, no es lo mas seguro pero funciona. asi identificamos luego cual post es imagen y cual no
            $this->insertar_post($contenidopost);
        }

        public function acomodarTweets($posts){
            //si un post es respuesta a otro post, moverlo debajo de ese post
            //primero debemos encontrar los post que no son respuesta a nadie
            $postsAcomodados = [];
            for($i= 0; $i<count($posts);$i++){
                if(!isset($posts[$i][3])){
                    array_push($postsAcomodados,$posts[$i]);
                    array_splice($posts,$i,1);
                    $i--;
                }
            }

           
            //luego encontramos las respuestas de cada mensaje y lo agregamos despues de su mensaje
            while(count($posts)>0){ 
                for($i=0;$i<count($posts);$i++){
                    if(isset($posts[$i][3])){//si me salen las respuestas al reves entonces darle vuelta con array_reverse, puede que exista respuesta a una respuesta entonces tener cuidado
                        for($k=0;$k<count($postsAcomodados);$k++){ //buscar el el parent del post encontrado
                            if($posts[$i][3]==$postsAcomodados[$k][0]){//dentro de posts acomodados
                                //encontramos padre en posicion k de los acomodados, agregar despues de este
                                array_splice( $postsAcomodados, $k, 0, array($posts[$i]));
                                array_splice($posts,$i,1);
                            }
                        }
                    }
                }
            }

            return $postsAcomodados;
        }
    }

?>