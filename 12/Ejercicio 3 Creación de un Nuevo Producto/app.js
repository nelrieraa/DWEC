const estadoValidcion = {nombre:false, sku:false, precio:false, stock:false, categoria:false};
const sku = document.getElementById('sku');
const btnGuardar = document.getElementById('btn-guardar');
const precio = document.getElementById('precio');
const nombre = document.getElementById('nombre');
const stock = document.getElementById('stock');
const categoria = document.getElementById('categoria');
const form = document.getElementById('product-form');
sku.addEventListener('blur', async function(e) {
    if (e.target.value.length >= 5) {
        const respuesta = await fetch('./data/productos.json');
        const productos = await respuesta.json();
        
        const existe = productos.some(p => p.sku === e.target.value);
        
        if (existe === false) {
            estadoValidcion.sku = true;
            console.log("SKU disponible");
        } else {
            estadoValidcion.sku = false;
            console.log("SKU ya existe");
        }
    } else {
        estadoValidcion.sku = false;
    }
    validarFormulario(); 
});

function validarFormulario(){
    const validacion = Object.values(estadoValidcion);
    if(validacion.every(v => v ===true)){
        console.log("si");
        btnGuardar.disabled = false;
    } else btnGuardar.disabled = true;
};

precio.addEventListener('input',function(e){
    if(e.target.value > 0){
        estadoValidcion.precio = true;
        
    }else{ 
        estadoValidcion.precio = false;
    }
    validarFormulario();
});
nombre.addEventListener('input',function(e){
    if(e.target.value.length > 0){
        estadoValidcion.nombre = true;
    } else{
        estadoValidcion.nombre = false;
    }
    validarFormulario();
});
stock.addEventListener('input',function(e){
    if(e.target.value >0){
        estadoValidcion.stock = true;
    }else {
        estadoValidcion.stock = false;
    }
    validarFormulario();
});
categoria.addEventListener('input',function(e){
    if(e.target.value.length >0){
        estadoValidcion.categoria = true;
    }else {
        estadoValidcion.categoria =false;
    }
    validarFormulario();
});
form.addEventListener('submit',function(e){
    e.preventDefault();
    alert("el producto se ha guardado correctamente");
});
