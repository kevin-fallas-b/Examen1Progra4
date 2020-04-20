window.addEventListener('load',funcionInicial, false);

var ventanas;
var relojsup;

function funcionInicial(){

    //encontrar app y darle evento de abrir
    var apps = document.getElementsByClassName("icons");
    for(var i=0; i<apps.length;i++){
        apps[i].addEventListener("click",openApp,false);
    }

    //click sobre el reloj abre calendario
    relojsup = document.getElementById("relojsuperior");
    setInterval("reloj()",1000);
    relojsup.addEventListener('click',abrircalendario,false);
}

function reloj(){
    var semana = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
    var fecha = new Date;
    var dia = fecha.getDay();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    relojsup.innerHTML = semana[dia] + " "+ hora+ ":"+ minutos+ ":" + segundos;
}

function openApp(){
    document.getElementById("pantalla").innerHTML +="<div class='contenedorapp'>"+
                                                        " <img src='./rsc/img/exit.png' class='botonsalir'>"+
                                                        " <label class='nombreapp'>"+this.getAttribute('data-value')+" </label>"+
                                                        " <object class='app' type='text/html' data='./rsc/apps/"+this.id+"/index.html' width='500px' height='300px'>"+
                                                        " </object>"+
                                                    "</div>";

    ventanas = document.getElementsByClassName("contenedorapp");
    agregarDragAndDrop(ventanas.length-1);
    agregarsalirapp();
}

function agregarDragAndDrop(){
    ventanas[ventanas.length-1].addEventListener('mousedown',mousedown);
}

function mousedown(e){
    window.addEventListener('mousemove',mousemove);
    window.addEventListener('mouseup',mouseup);

    var prevX = e.clientX;
    var prevY = e.clientY;

    function mousemove(e){
        var newX = prevX - e.clientX;
        var newY = prevY - e.clientY;

        var rect = ventanas[ventanas.length-1].getBoundingClientRect();

        ventanas[ventanas.length-1].style.left = rect.left - newX + "px";
        ventanas[ventanas.length-1].style.top = rect.top - newY + "px"

        prevX = e.clientX;
        prevY = e.clientY;
    }

    function mouseup(){
        window.removeEventListener('mousemove',mousemove);
        window.removeEventListener('mouseup',mouseup);
    }
}

function agregarsalirapp(){
 
}

function abrircalendario(){
    console.log("abrio calendario");
}