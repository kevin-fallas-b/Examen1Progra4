window.addEventListener('load',funcioninicial,false);

var escogerimagen; //var que contiene al filepicker
var canvas;
var ctx; //context del canvas

function funcioninicial(){
    document.getElementById('buscararchivo').addEventListener('click',buscararchivo);
    escogerimagen = document.getElementById('escogerimagen');
    escogerimagen.addEventListener('change',cargarfoto);

    canvas = document.getElementById('areadibujo');
    ctx = canvas.getContext('2d');
    ctx.font='20px arial';

    document.getElementById('dibujar').addEventListener('click',dibujar);
    document.getElementById('contenedordescargar').addEventListener('click',descargar);

    //agregar manejadores de eventos para drag and drop y resize
    canvas.addEventListener('mousedown',mousedown);
    canvas.addEventListener('mousemove',mousemove);
    canvas.addEventListener('mouseup',mouseup);
}


function buscararchivo(){
    escogerimagen.click();
}

function cargarfoto(){
    document.getElementById("nombrearchivo").value = escogerimagen.files[0].name;
    var img = new Image();
    img.onload = function(){
        canvas.width = 800;
        canvas.height = 600;
        ctx.drawImage(img,0,0,img.width,img.height,0,0,800,600);
        document.getElementById('contenedordescargar').classList.toggle('fade');
    }
    img.src = URL.createObjectURL(escogerimagen.files[0]);
}

function dibujar(){
    var text = document.getElementById('textodibujar').value
    document.getElementById('textodibujar').value = '';
    dibujarglobo(ctx, 10, 60, ctx.measureText(text).width + 40, 50, 20, text);
}

function descargar(){
    var link = document.getElementById('linkdescarga');
    link.setAttribute('download', 'ComicMakerExport.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
}

/*
ctx = contexto de canvas
x = x donde se empieza a dibujar
y = y donde se empieza de dibujar
w = x donde se termina de dibujar
h = y donde se termina de dibujar
radius = radio del globo
text = texto dentro del globo
*/
function dibujarglobo(ctx, x, y, w, h, radius, text)
{
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
   ctx.fillText(text, x + 20, y + 30);
}

function mousedown(e){
    console.log('mouse down dentro de canvas')
}

function mousemove(e){
    
}

function mouseup(e){
    console.log('mouse up dentro de canvas')
}

