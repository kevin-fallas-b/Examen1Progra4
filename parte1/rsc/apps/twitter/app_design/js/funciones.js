window.addEventListener("load",iniciar,false);

var actualizando; //bandera, esta actualizando o no
var idEditando;//variable que, si en caso de estar editando, guarda el id del post que se esta editando;
var idRespondiendo; //varaible que guarda a que post se le resta respondiendo
var respondiendo;// bandera que indica si estoy respondiendo o no
var btnguardarajax; //btn guardar mediante axios
var btnresponder;
var cajonmensajes;//cajon que contiene todos los mensajes
var mensajes=[]; //array que me guarda todos los mensajes que hay en pantalla. para validaciones mas que todo

function iniciar(){
    btnguardarajax = document.getElementById("btn_saveajax");
    btnsubirimagen = document.getElementById("btn_subirimagen");
    inputimagen =  document.getElementById("escogerimagen");
    btnguardarajax.addEventListener("click",guardarAjax,false);
    actualizando=false;
    respondiendo=false;
    cajonmensajes = document.getElementById('main_panel');
    cajonmensajes.addEventListener('change',encontrarMensajes);
    idRespondiendo = null;
    mensajes=[];
}

function encontrarMensajes(){
    mensajes = Array.prototype.slice.call(document.getElementsByClassName("post_block0"));    
    mensajes.push(...Array.prototype.slice.call(document.getElementsByClassName("post_block1")),...Array.prototype.slice.call(document.getElementsByClassName("post_block2")),...Array.prototype.slice.call(document.getElementsByClassName("post_block3")));
}

function guardarAjax(){
    var texto = document.getElementById("txt_post").value;
    var form = new FormData();
    form.append("txt_post", texto);

    if(actualizando){
        //actualizar post
        actualizando=false;
        form.append("btn_actualizar",true);
        form.append("id_post",idEditando);
        actualizarNoActualizar();
    }else{
    //post nuevo
        if(respondiendo){
            form.append('respondiendo',idRespondiendo);
            manejarRespuesta();
        }else{
            form.append('respondiendo','null');
        }
        form.append("btn_save",true);
        
    }
    //hacer el post
    axios.post('index.php', form)
    .then(function (response) {
       // console.log(response.data);
        document.getElementById("frm_service").reset()
        buscar("");
    })
    .catch(function (error) {
        console.log(error);
    })
    
}

function buscar(aBuscar){
        axios.get('index.php',{
        params:{
            datobusqueda: aBuscar
        }
    }).then(function (response){
        document.getElementById("main_panel").innerHTML = response.data;
    }).catch(function (error){
        console.log(error);
    });
}


function eliminar(id){
    var form = new FormData();
    //buscar respuestas a mi comentario.
    encontrarMensajes();
    var mensajesABorrar = [];//array que contiene todo lo que ocupo eliminar
    mensajesABorrar.push(id);
    var seguir=true; //bandera
    var vueltas =0;
    while(seguir){
        seguir = false;
        for(var i=vueltas;i<mensajesABorrar.length;i++){
            for(var k=0;k<mensajes.length;k++){
                if(mensajesABorrar[i] == mensajes[k].getAttribute('data-value')){
                    mensajesABorrar.push(mensajes[k].id.replace('mensajeid',''));
                    seguir=true;
                    mensajes.splice(k,1);
                    k--;
                }
            }
        }
        vueltas++;
    }

    
    form.append("btn_eliminar",true);
    form.append("id_post", mensajesABorrar.toString());
    axios.post('index.php', form)
    .then(function (response) {
           buscar(' ');
    })
    .catch(function (error) {

    })
}

function editar(id,post){
    actualizando=true;
    idEditando = id;
    document.getElementById("txt_post").value = post;
    actualizarNoActualizar();
}

function actualizarNoActualizar(){

    var txt_buscar =  document.getElementById("txt_buscar");
    if(actualizando){
        txt_buscar.setAttribute("disabled","disabled");
        btnguardarajax.value = "Actualizar con ajax";
        cajonmensajes.classList.add('desabilitado')
        cajonmensajes.addEventListener('keydown',cancelaractualizar);
    }else{
        txt_buscar.removeAttribute("disabled");;
        btnguardarajax.value= "Publicar con ajax";
        cajonmensajes.classList.remove('desabilitado');
        cajonmensajes.removeEventListener('keydown',cancelaractualizar);
        idEditando=-1;
    }
}

function cancelaractualizar(e){

    if(e.code == "Escape"){
        if(respondiendo){
            idRespondiendo=null;
            manejarRespuesta();
        }else{
            actualizando = false;
            idEditando =-1;
            actualizarNoActualizar();
        }
    }
}

//metodo que se llama al presionar btn responder
function responder(id){
    idRespondiendo = id;
    manejarRespuesta();
}

function manejarRespuesta(){
    if(!respondiendo){
        respondiendo=true;
        txt_buscar.setAttribute("disabled","disabled");
        cajonmensajes.classList.add('desabilitado')
        cajonmensajes.addEventListener('keydown',cancelaractualizar);
    }else{
        //dejo de responer
        respondiendo=false;
        txt_buscar.removeAttribute("disabled");
        cajonmensajes.classList.remove('desabilitado');
        cajonmensajes.removeEventListener('keydown',cancelaractualizar);
    }
}