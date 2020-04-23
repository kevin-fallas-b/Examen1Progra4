window.addEventListener('load',funcioninicial);


var btnguardar;
//variables de la persona que se esta editando
var id;//en caso de estar editando guardar id
var nombre;
var papellido;
var sapellido;
var cedula;
var fechan;
var telefono;
var email;
var direccion;
var departamento;
var puesto;
var salario;
var observaciones;
//fin variables personas
var actualizando;//bandera para saber si guardar o actualizar


function funcioninicial(){
    btnguardar=document.getElementById('btnguardar');
    btnguardar.addEventListener('click',clickguardar);
    alertify.set('notifier','position','top-right')
    actualizando=false;
}

//agarra toda la informacion digitada por el usuario y la mete a variables
function captarDatos(){
    nombre=document.getElementById('nombre').value;
    papellido=document.getElementById('papellido').value;
    sapellido=document.getElementById('sapellido').value;
    cedula=document.getElementById('cedula').value;
    fechan=document.getElementById('fechan').value;
    telefono=document.getElementById('telefono').value;
    email=document.getElementById('email').value;
    direccion=document.getElementById('direccion').value;
    departamento=document.getElementById('departamento').value
    puesto=document.getElementById('puesto').value;
    salario=document.getElementById('salario').value;
    observaciones=document.getElementById('observaciones').value;
}

//se llama cuando se hace click en el boton, valida si las cosas estan bien, hace el post con axios
function clickguardar(){
    captarDatos();
    if(datoscorrectos()){ //validar informacion
        var form = new FormData();
        /*if(!actualizando){
            form.append('actualizar',true);
            form.append('id',id);
        }else{
            form.append("guardar", true);
        }*/
        form.append("guardar", true);
        form.append('nombre',nombre);
        form.append('papellido',papellido);
        form.append('sapellido',sapellido);
        form.append('cedula',cedula);
        form.append('fechan',fechan);
        form.append('telefono',telefono);
        form.append('email',email);
        form.append('direccion',direccion);
        form.append('departamento',departamento);
        form.append('puesto',puesto);
        form.append('salario',salario);
        form.append('observaciones',observaciones);


        axios.post('index.php', form)
        .then(function (response) {
               console.log(response.data);
        })
        .catch(function (error) {

        })
    }    
}

//valida rapidamente las cosas
function datoscorrectos(){
    var todobien=true;
    //validacion mas sencilla que hay, ver que todo tenga algo
    if(!nombre || !papellido || !sapellido || !cedula || !fechan || !telefono || !email || !direccion || !departamento ||!puesto ||!salario){
        alertify.error('revise bien');
        todobien=false;
    }
    return todobien;
}