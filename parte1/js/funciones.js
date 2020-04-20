window.addEventListener('load',funcionInicial, false);

var ventanas;
var relojsup;
var calendarioabierto;

function funcionInicial(){
    calendarioabierto=false;
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
    ventanas = document.getElementsByClassName("contenedorapp");
    if(ventanas.length>0){
        cerrarventana();
    }
     ventanaNueva="<div class='contenedorapp'>"+
                " <img src='./rsc/img/exit.png' class='botonsalir'>"+
                " <label class='nombreapp'>"+this.getAttribute('data-value')+" </label>"+
                " <object class='app' type='text/html' data='./rsc/apps/"+this.id+"/index.html' width='500px' height='300px'>"+
                " </object>"+
                "</div>";
    document.getElementById("pantalla").insertAdjacentHTML('beforeend',ventanaNueva);
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
    var botonsalir = document.getElementsByClassName('botonsalir');
    botonsalir[0].addEventListener('click',cerrarventana);
}

function cerrarventana(){
    document.getElementById("pantalla").removeChild(ventanas[0]);

}

function abrircalendario(e){
    if(!calendarioabierto){
        document.getElementById('calendario').removeAttribute("hidden");
        calendarioabierto=true;
        //agregar que en cualquier parte me cierre el calendario
        document.getElementById('pantalla').addEventListener('click',abrircalendario);
        e.stopPropagation();
    }else{
        document.getElementById('calendario').setAttribute("hidden",true);
        calendarioabierto=false;
    }
}