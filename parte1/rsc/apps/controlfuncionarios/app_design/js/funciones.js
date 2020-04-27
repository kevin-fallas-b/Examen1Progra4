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
var ideditando;
var cajonmensajes;
var escogerimagen; //filepicker
var extensionimagen;

function funcioninicial(){
    btnguardar=document.getElementById('btnguardar');
    btnguardar.addEventListener('click',clickguardar);
    alertify.set('notifier','position','top-right')
    actualizando=false;
    document.getElementById('txtbuscar').addEventListener('keyup',buscar);
    buscar();//poblar todo
    cajonmensajes = document.getElementById('main_panel');
    document.getElementById('btncambiarimg').addEventListener('click',buscararchivo);
    escogerimagen = document.getElementById('escogerimagen');
    escogerimagen.addEventListener('change',cargarfoto);
    extensionimagen=-1;
}


//metodo que se llama al presionar el boton buscar en pantalla
function buscararchivo(){
    escogerimagen.click();
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
        if(actualizando){
            form.append('actualizar',true);
            form.append('id',ideditando);
            console.log(ideditando);
            actualizando=false;
            actualizarNoActualizar();
            alertify.success('Actualizo exitosamente');
        }else{
            form.append("guardar", true);
            alertify.success('Guardo exitosamente');
        }
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
        form.append('foto',escogerimagen.files[0]);
        form.append('nombrefoto',cedula.trim()+'.'+extensionimagen);


        axios.post('index.php', form)
        .then(function (response) {
               buscar();
               limpiarcampos();
        })
        .catch(function (error) {

        })
    }    
}

//valida rapidamente las cosas
function datoscorrectos(){
    var todobien=true;
    //validacion mas sencilla que hay, ver que todo tenga algo
    if(!nombre || !papellido || !sapellido || !cedula || !fechan || !telefono || !email || !direccion || !departamento ||!puesto ||!salario || extensionimagen==-1){
        alertify.error('Existen errores en los campos');
        todobien=false;
    }
    return todobien;
}

function buscar(){
    var aBuscar = document.getElementById('txtbuscar').value;
    axios.get('index.php',{
        params:{
            datobusqueda: aBuscar
        }
    }).then(function (response){
        document.getElementById("main_panel").innerHTML = response.data;
        funcionalidadaAcordiones();
    }).catch(function (error){
        console.log(error);
    });
}

function funcionalidadaAcordiones(){
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if(panel.style.maxHeight) {
            panel.style.maxHeight = null;       
        } else {
            panel.style.maxHeight = panel.scrollHeight + "40px";
         }
    });
    }
}

function limpiarcampos(){
    document.getElementById('nombre').value = '';
    document.getElementById('papellido').value = '';
    document.getElementById('sapellido').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('fechan').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('departamento').value = '';
    document.getElementById('puesto').value = '';
    document.getElementById('salario').value = '';
    document.getElementById('observaciones').value = '';
    document.getElementById('fotofuncselec').src = 'app_core/resources/images/user.png';
}

function eliminar(id){
    axios.get('index.php',{
        params:{
            eliminar: id
        }
    }).then(function (response){
        buscar();
        limpiarcampos();
        alertify.success('Elimino correctamenta.');
    }).catch(function (error){
        console.log(error);
    });
}

function editar(id){
    actualizando = true;
    ideditando = id;
    actualizarNoActualizar();

    //buscar el acordion que contiene los datos
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        if(acc[i].value == id){
            break;
        }        
    }
    var panel = acc[i].nextElementSibling;//div con clase panel que contiene los datos

    var nombrefun = panel.getElementsByClassName('nombrefun');
    var papellidofun = panel.getElementsByClassName('papellidofun');
    var sapellidofun = panel.getElementsByClassName('sapellidofun');
    var cedulafun = panel.getElementsByClassName('cedulafun');
    var fechanfun = panel.getElementsByClassName('fechanfun');
    var telefonofun = panel.getElementsByClassName('telefonofun');
    var emailfun = panel.getElementsByClassName('emailfun');
    var direccionfun = panel.getElementsByClassName('direccionfun');
    var departamentofun = panel.getElementsByClassName('departamentofun');
    var puestofun = panel.getElementsByClassName('puestofun');
    var salariofun = panel.getElementsByClassName('salariofun');
    var observacionesfun = panel.getElementsByClassName('observacionesfun');
    var fotofun = panel.getElementsByClassName('fotofun');


    document.getElementById('nombre').value = nombrefun[0].innerHTML;
    document.getElementById('papellido').value = papellidofun[0].innerHTML;
    document.getElementById('sapellido').value = sapellidofun[0].innerHTML;
    document.getElementById('cedula').value = cedulafun[0].innerHTML;
    document.getElementById('fechan').value = fechanfun[0].innerHTML;
    document.getElementById('telefono').value = telefonofun[0].innerHTML;
    document.getElementById('email').value = emailfun[0].innerHTML;
    document.getElementById('direccion').value = direccionfun[0].innerHTML;
    document.getElementById('departamento').value = departamentofun[0].innerHTML;
    document.getElementById('puesto').value = puestofun[0].innerHTML;
    document.getElementById('salario').value = salariofun[0].innerHTML;
    document.getElementById('observaciones').value = observacionesfun[0].innerHTML;
    document.getElementById('fotofuncselec').src = fotofun[0].src;
 
}

function actualizarNoActualizar(){
    var txt_buscar =  document.getElementById("txtbuscar");
    if(actualizando){
        txt_buscar.setAttribute("disabled","disabled");
        cajonmensajes.classList.add('desabilitado')
        document.getElementById('mensajecancelar').style.zIndex =4;
        document.getElementById('mensajecancelar').style.opacity =1;
        cajonmensajes.addEventListener('keydown',cancelaractualizar);
    }else{
        txt_buscar.removeAttribute("disabled");;
        cajonmensajes.classList.remove('desabilitado');
        document.getElementById('mensajecancelar').style.zIndex =-4;
        document.getElementById('mensajecancelar').style.opacity =0;
        cajonmensajes.removeEventListener('keydown',cancelaractualizar);
        ideditando = -1;
        limpiarcampos();
    }
}

function cancelaractualizar(e){
    if(e.code == "Escape"){
        actualizando = false;
        idEditando =-1;
        actualizarNoActualizar();
    }
}

function cargarfoto(e){
    document.getElementById('fotofuncselec').src = URL.createObjectURL(e.target.files.item(0));
    extensionimagen =e.target.files.item(0).name.split('.').pop();
}