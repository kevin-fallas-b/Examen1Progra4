window.addEventListener('load',funcioninicial,false);

var escogerimagen; //var que contiene al filepicker
var canvas;
var ctx; //context del canvas
var textos=[]; //array que contiene los textos y el tamano de la burbuja alrededor
var offsetLeft; //offset left del canvas
var offsetTop; //offset top del canvas
var burbujaseleccionada; //guarda el indice de la burbuja seleccionada dentro del array de textos
var img; //foto cargada por el usuario
var moviendo;// bandera que me dice si estoy moviendo burbuja o redimenzionado 

function funcioninicial(){
    alert("Para mover una burbuja de dialogo haga click sobre la burbuja y arrestre.\nPara cambiar el tamaño de una burbuja de dialogo haga click sobre la burbuja, presione shift y arrestre.")
    document.getElementById('buscararchivo').addEventListener('click',buscararchivo);
    escogerimagen = document.getElementById('escogerimagen');
    escogerimagen.addEventListener('change',cargarfoto);

    canvas = document.getElementById('areadibujo');
    ctx = canvas.getContext('2d');

    document.getElementById('dibujar').addEventListener('click',dibujar);
    //deshabilitar boton hasta que haya una imagen cargadas
    document.getElementById('dibujar').disabled = true;
    document.getElementById('dibujar').style.opacity =0.5;
    document.getElementById('contenedordescargar').addEventListener('click',descargar);

    agregarListenersCanvas();
}

//cuando se carga imagen el canvas se renueva, entonces toca meterle de nuevo los listeners y calcular los offset
function agregarListenersCanvas(){
    //agregar manejadores de eventos para drag and drop y resize
    canvas.addEventListener('mousedown',mousedown);
    canvas.addEventListener('mousemove',mousemove);
    canvas.addEventListener('mouseup',mouseup);
    document.addEventListener('keydown',keydown);
    document.addEventListener('keyup',keyup);

    //calcular offset, ayuda al drag and drop
    offsetLeft = canvas.offsetLeft + document.getElementById('contenedorcanvas').offsetLeft;
    offsetTop =canvas.offsetTop + document.getElementById('contenedorcanvas').offsetTop;
    burbujaseleccionada =-1;

    //estilo de las letras para el comic
    ctx.font='15px arial';

}

//metodo que se llama al presionar el boton buscar en pantalla
function buscararchivo(){
    escogerimagen.click();
}

//cuando hay un change en el filepicker se ejecuta, carga por primera vez la imagen en el canvas y habilita el boton dibujar
function cargarfoto(){
    document.getElementById("nombrearchivo").value = escogerimagen.files[0].name;
    img = new Image();
    img.onload = function(){
        canvas.width = 800;
        canvas.height = 600;
        ctx.drawImage(img,0,0,img.width,img.height,0,0,800,600);
        document.getElementById('contenedordescargar').classList.toggle('fade');
        agregarListenersCanvas();
        textos = [];
        //habilitar boton dibujar y quitarle focus
        document.getElementById('dibujar').disabled = false;
        document.getElementById('dibujar').style.opacity=1;
    }
    img.src = URL.createObjectURL(escogerimagen.files[0]);
}

//metodo que se llama cuando se presiona en pantalla el boton dibujar, agarra el texto y llama a dibujar globo
function dibujar(){
    var text = document.getElementById('textodibujar').value
    document.getElementById('textodibujar').value = '';
    dibujarglobo(ctx, 50, 60, ctx.measureText(text).width + 80, 90, 20, text);
}

//metodo que se llama el presionar el boton de descarga en pantalla
function descargar(){
    var link = document.getElementById('linkdescarga');
    link.setAttribute('download', 'ComicMakerExport.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
}

/*
metodo que dibuja las burbujas de texto sobre el canvas, tambien los agrega a un array que me guarda todas las burbujas sobre el canvas

ctx = contexto de canvas
x = x donde se empieza a dibujar
y = y donde se empieza de dibujar
w = width del globo
h = altura del globo
radius = radio del globo
text = texto dentro del globo
*/
function dibujarglobo(ctx, x, y, w, h, radius, text)
{

    //agregar informacion al array de textos, esto ayuda a la hora del drag and drop
   textos.push({texto:text, xinicial:x, yinicial: y,width:w, height:h, radio:radius});
   var r = x + w;
   var b = y + h;

   ctx.beginPath();
   ctx.fillStyle = "white";
   ctx.fill();
   ctx.strokeStyle = "black";
   ctx.lineWidth = "2";
   ctx.moveTo(x + radius, y);

   ctx.lineTo(r - radius, y);
   ctx.quadraticCurveTo(r, y, r, y + radius);
   ctx.lineTo(r, y + h-radius);
   ctx.quadraticCurveTo(r, b, r - radius, b);
   ctx.lineTo(x + radius, b);
   ctx.quadraticCurveTo(x, b, x, b - radius);
   ctx.lineTo(x, y + radius);
   ctx.quadraticCurveTo(x, y, x + radius, y);
   ctx.fill();
   ctx.stroke();
   ctx.fillStyle = "#000";
   //ahi tuve que calcular como colocar el texto en el centro, y canvas es una cochinada no soporta new lines en los strings
   ctx.fillText(text,x +(( w- ctx.measureText(text).width )/2), y + (h/2));
}


//listener para cuando se tiene abajo al click del mouse, revisa si esta dentro de una burbuja
function mousedown(e){
    e.preventDefault();
    var clickX = parseInt(e.clientX - offsetLeft);
    var clickY = parseInt(e.clientY - offsetTop);
    //revisar si el click se dio dentro de algun text bubble
    for(var i = 0;i<textos.length;i++){
        if(textos[i].xinicial < clickX && clickX < (textos[i].xinicial+textos[i].width) && textos[i].yinicial < clickY && clickY < (textos[i].yinicial+textos[i].height) ){
            burbujaseleccionada = i;
            break;
        }
    }
}


//revisar si el usuario quiere redimensionar
function keydown(e){
    if(e.code=='ShiftLeft' || e.code=='ShiftRight'){
        moviendo=false;
    }
}

//cancelar redimenzionar y volver solo a mover
function keyup(e){
    moviendo=true;
}


//si hay una burbuja seleccionada, calcular cuanto se ha movido el mouse para luego repintar
function mousemove(e){
    if(burbujaseleccionada!=-1){
        e.preventDefault();
        var xnuevo = parseInt(e.clientX-offsetLeft);
        var ynuevo = parseInt(e.clientY-offsetTop);
        
        if(moviendo){
            var dx = xnuevo - textos[burbujaseleccionada].xinicial; //saber cuantos pixeles se ha movido la burbuja. Diferencia X
            var dy = ynuevo - textos[burbujaseleccionada].yinicial;
            
            textos[burbujaseleccionada].xinicial+=dx;
            textos[burbujaseleccionada].yinicial+=dy;
            
        }else{
            var dw = xnuevo - textos[burbujaseleccionada].width; //saber cuantos pixeles se ha movido la burbuja. Diferencia X
            var dh = ynuevo - textos[burbujaseleccionada].height;
            textos[burbujaseleccionada].width+=dw;
            textos[burbujaseleccionada].height+=dh;
        }
        redibujar();

    }
}

//se nos pidio que funcionara, mas no se nos pidio el mejor rendimiento. aprovechemos esos recursos de sistema
function redibujar(){
    //limpiamos el canvas
    ctx.clearRect(0,0,800,600);
    var textosAux = textos.slice();
    textos=[];

    //ponemos el fondo
    ctx.drawImage(img,0,0,img.width,img.height,0,0,800,600);

    //recorremos array de burbujas y las redibujamos
    for(var i=0;i<textosAux.length;i++){
        dibujarglobo(ctx, textosAux[i].xinicial, textosAux[i].yinicial, textosAux[i].width, textosAux[i].height,textosAux[i].radio,textosAux[i].texto);
    }
}

//dejar de mover
function mouseup(e){
    e.preventDefault();
    burbujaseleccionada=-1;
}
