window.addEventListener("load",agregaronclick,false);
window.addEventListener("load",inicializar, false);

//guarda informacion de productos para graficos
var nombres=[];
var cantidad=[];
var precios=[];
//guardan opciones
var tipo;
var por;//indica si por precio o cantidad

//checks de opciones
var checkbarra;
var checklineal;
var checkprecio;
var checkcantidad;
var myChart;

function inicializar(){
    document.getElementById("btn_eliminarajax").addEventListener("click",eliminarAjax,false);
    document.getElementById("btn_guardar").addEventListener("click",validarguardar,false);
    alertify.set('notifier','position','top-right');
    document.getElementById('generargrafico').addEventListener('click',generargrafico);
    checkbarra = document.getElementById('barras');
    checklineal = document.getElementById('lineal');
    checkprecio = document.getElementById('tipoprecio');
    checkcantidad = document.getElementById('tipocantidad');

    checklineal.addEventListener('click',manejarChecklineal);
    checkbarra.addEventListener('click',manejarCheckbarras);
    checkcantidad.addEventListener('click',manejarCheckcant);
    checkprecio.addEventListener('click',manejarCheckprecio);
    por='precio';
    tipo='horizontalBar';
}

function manejarChecklineal(){
    if(checkbarra.checked){
        checkbarra.checked = false;
    }else{
        checklineal.checked=true;
    }
    tipo='line'
}

function manejarCheckbarras(){
    if(checklineal.checked){
        checklineal.checked = false;
    }else{
        checkbarra.checked = true;
    }
    tipo='horizontalBar';
}

function manejarCheckcant(){
    if(checkprecio.checked){
        checkprecio.checked = false;
    }else{
        checkcantidad.checked=true;
    }
    por='cantidad';
}

function manejarCheckprecio(){
    if(checkcantidad.checked){
        checkcantidad.checked = false;
    }else{
        checkprecio.checked = true;
    }
    por='precio';
}

function generargrafico(){
    var datos;
    var nombre;
    if(por=='precio'){
        datos=precios;
        nombre='Precio por producto'
    }else{
        datos=cantidad;
        nombre='Cantidad de producto';
    }
    obtenerProductos();
    var canvas =document.getElementById('canvasgraficos');
    var ctx = canvas.getContext('2d');
    if(myChart!=undefined){
        myChart.destroy();
    }
    myChart = new Chart(ctx, {
    type: tipo,
    data: {
        labels:nombres,
        datasets: [{
            label: nombre,
            data: datos,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

    nombres = [];
    precios =[];
    cantidad =[];
}

//metodo que busca
function cargarProductos(dato){
    axios.get('mantenimiento.php',{
        params:{
            datobusqueda: dato
        }
    }).then(function (response){
        document.getElementById("grid").innerHTML = response.data;
    }).catch(function (error){
        alertify.error(error.response.data);
    });
}

function agregaronclick(){
    var tabla = document.getElementById("tabla");
    var txt_cod = document.getElementById("txt_cod");
    var txt_nom = document.getElementById("txt_nom");
    var txt_precio = document.getElementById("txt_prec");
    var txt_cant = document.getElementById("txt_cant");
    var txt_proveedor = document.getElementById("txt_pro");
    var txt_fechav = document.getElementById("txt_fechav");
    for( var i=1; i<tabla.rows.length;i++){
        tabla.rows[i].addEventListener("click",function(){
            txt_cod.value = this.cells[0].innerHTML;
            txt_nom.value = this.cells[1].innerHTML;
            txt_precio.value =this.cells[2].innerHTML;
            txt_cant.value = this.cells[3].innerHTML;
            txt_proveedor.value = this.cells[4].innerHTML;
            txt_fechav.value = this.cells[5].innerHTML;
        },false);
    }  
}

function validarguardar(){
    var txt_cod = document.getElementById("txt_cod");
    var txt_nom = document.getElementById("txt_nom");
    var txt_precio = document.getElementById("txt_prec");
    var txt_cant = document.getElementById("txt_cant");
    var txt_proveedor = document.getElementById("txt_pro");
    var txt_fechav = document.getElementById("txt_fechav");
    var todobien=true;
        if(txt_cod.value=="" || txt_nom.value=="" || txt_precio.value == "" || txt_cant.value == "" || txt_proveedor.value =="" || txt_fechav.value == ""){
            todobien = false;
        }    
    if(todobien){
        var form = new FormData();
        form.append("guardar", document.getElementById("btn_guardar").value);
        form.append("txt_cod", txt_cod.value);
        form.append("txt_nom", txt_nom.value);
        form.append("txt_prec", txt_precio.value);
        form.append("txt_cant", txt_cant.value);
        form.append("txt_pro", txt_proveedor.value);
        form.append("txt_fechav",txt_fechav.value);
        form.append("mensaje", "Guardado exitosamente");

        //este codigo de abajo esta aqui porque para hacer validaciones por html tambien estaba haciendo el guardar por axios
        // luego de verlo un poco note que no hay necesidad de usar una libreria externa para algo tan sencillo, mejor hacerlo nativo ya que hacerlo de manera asincronica
        // no me brinda  ningun beneficio en este caso, pero deje el codigo ahi por aquello


        //axios.post("formulario.php", form)
        //.then(function (response) { 
            //this.cargarProductos("");
            //console.log(response);
        //})
        //./catch(function (error) { 
          //  console.log("Error");
            //alertify.error(error.response.data);
        //});

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'formulario.php', true);
        xhr.onload = function () {
            limpiarCampos();
            alertify.success("Producto guardado exitosamente");
            cargarProductos("");
            setTimeout(() => {
                agregaronclick();    
            }, 500)
            

        };
        xhr.send(form);
    }else{
        alertify.error("Existen errores en los campos. Por favor verifique la informacion.");
    }
}

function eliminarAjax(){
    var form = new FormData();
    
    form.append("btn_eliminar", document.getElementById("btn_eliminar").value);
    form.append("txt_cod", document.getElementById("txt_cod").value);
    axios.post("formulario.php", form)
    .then(function (response) {
        limpiarCampos();
        alertify.success("Producto eliminado exitosamente");
        cargarProductos("");
        setTimeout(() => {
            agregaronclick();    
        }, 500)
    })
    .catch(function (error) { 
        alertify.error(error.response.data);
    });
}

function limpiarCampos(){
     document.getElementById("txt_cod").value = "";
     document.getElementById("txt_nom").value = "";
     document.getElementById("txt_prec").value = "";
     document.getElementById("txt_cant").value = "";
     document.getElementById("txt_pro").value = "";
     document.getElementById("txt_fechav").value = "";
}

function obtenerProductos(){
    var tabla = document.getElementById("tabla");
    for(var i=1;i<tabla.rows.length;i++){
        nombres.push(tabla.rows[i].cells[1].innerHTML);
        precios.push(tabla.rows[i].cells[2].innerHTML);
        cantidad.push(tabla.rows[i].cells[3].innerHTML);
    }
}
