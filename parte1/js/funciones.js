window.addEventListener('load',funcionInicial, false);

function funcionInicial(){
    setInterval("reloj()",1000);
}

function reloj(){
    var semana = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
    var fecha = new Date;
    var dia = fecha.getDay();
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    document.getElementById("relojsuperior").innerHTML = semana[dia] + " "+ hora+ ":"+ minutos+ ":" + segundos;
}