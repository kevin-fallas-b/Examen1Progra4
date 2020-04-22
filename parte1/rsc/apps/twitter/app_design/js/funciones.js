window.addEventListener("load",iniciar,false);

var actualizando; //bandera, esta actualizando o no
var idEditando;//variable que, si en caso de estar editando, guarda el id del post que se esta editando;
var btnguardarajax; //btn guardar mediante axios
var btnguardar; //btn original
var btnsubirimagen;// boton que ve el usuario
var inputimagen;//este es invisble, ocupo cuidar cuando tiene cambio. es el <input type'file'>
var btnresponder;

function iniciar(){
    btnguardarajax = document.getElementById("btn_saveajax");
    btnsubirimagen = document.getElementById("btn_subirimagen");
    inputimagen =  document.getElementById("escogerimagen");
    btnguardarajax.addEventListener("click",guardarAjax,false);
    btnsubirimagen.addEventListener("click",buscarimagen,false);
    inputimagen.addEventListener("change",subirimagen,false);
    actualizando=false;
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
        form.append("btn_save",true);
    }
    //hacer el post
    axios.post('index.php', form)
    .then(function (response) {
        console.log(response.data);
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
    form.append("btn_eliminar",true);
    form.append("id_post", id);
    axios.post('index.php', form)
    .then(function (response) {
        buscar("");
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
    var nodes = document.getElementsByClassName("post_block");
    var txt_buscar =  document.getElementById("txt_buscar");
    if(actualizando){
        btnsubirimagen.setAttribute("disabled","disabled");
        txt_buscar.setAttribute("disabled","disabled");
        btnguardarajax.value = "Actualizar con ajax";
        for(var i = 0; i < nodes.length; i++){
            nodes[i].classList.add('desabilitado');
        }
    }else{
        txt_buscar.removeAttribute("disabled");
        btnsubirimagen.removeAttribute("disabled");
        btnguardarajax.value= "publicar Con ajax";
        for(var i = 0; i < nodes.length; i++){
            nodes[i].classList.remove('desabilitado');
        }
        idEditando=-1;
    }
}


function buscarimagen(){
   inputimagen.click();
}

function subirimagen(){
    var form = new FormData();
    form.append("subirimagen",true);
    form.append("escogerimagen",inputimagen.files[0])
    axios.post('index.php', form,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    .then(function (response) {
        console.log(response.data);
        buscar("");
    })
    .catch(function (error) {

    })  
}

function responder(id){
    console.log('respondio a post: '+id);
}