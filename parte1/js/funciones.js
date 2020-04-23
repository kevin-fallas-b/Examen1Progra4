window.addEventListener('load',funcionInicial, false);

var ventanas;
var relojsup;
var calendarioabierto;
var mostrandofondos;
var fondos;

function funcionInicial(e){
    calendarioabierto=false;
    document.getElementById('calendario').style.zIndex = -1;
    //encontrar app y darle evento de abrir
    var apps = document.getElementsByClassName("icons");
    for(var i=0; i<apps.length;i++){
        apps[i].addEventListener("click",openApp,false);
    }

    //click sobre el reloj abre calendario
    relojsup = document.getElementById("relojsuperior");
    setInterval("reloj()",1000);
    relojsup.addEventListener('click',abrircalendario,false);


    //click sobre cambiar fondo
    document.getElementById('gearcambiarfondo').addEventListener('click',mostrarfondos);
    mostrandofondos=false;

    //click sobre un fondo
    fondos = document.getElementsByClassName('contenedorimagenfondo');
    for(var i=0; i< fondos.length; i++){
        fondos[i].addEventListener('click',cambiarfondo.bind(this,fondos[i].getAttribute('data-value')));
    }

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
                " <object class='app' type='text/html' data='./rsc/apps/"+this.id+"' width='500px' height='300px'>"+
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
        document.getElementById('calendario').classList.toggle('fade')
        document.getElementById('calendario').style.zIndex = 1;
        calendarioabierto=true;
        //agregar que en cualquier parte me cierre el calendario
        document.getElementById('pantalla').addEventListener('click',abrircalendario);
        e.stopPropagation();
    }else{
        document.getElementById('calendario').classList.toggle('fade')
        document.getElementById('calendario').style.zIndex = -1;
        document.getElementById('pantalla').removeEventListener('click',abrircalendario);
        calendarioabierto=false;
    }
}

function mostrarfondos(e){
    if(!mostrandofondos){
        document.getElementById('contenedorfondos').classList.toggle('fade')
        mostrandofondos=true;
        //agregar que en cualquier parte me cierre el calendario
        document.getElementById('pantalla').addEventListener('click',mostrarfondos);
        e.stopPropagation();
    }else{
        document.getElementById('contenedorfondos').classList.toggle('fade')
        document.getElementById('pantalla').removeEventListener('click',mostrarfondos);
        mostrandofondos=false;
    }
}

function cambiarfondo(nombreimagen){
    if(mostrandofondos){
        mostrarfondos();
        document.getElementById('pantalla').style.backgroundImage="url('rsc/img/"+nombreimagen+"')";
    }
}