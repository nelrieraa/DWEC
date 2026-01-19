const drop = document.getElementById('drop-zone');
const file = document.getElementById('file-input');
const contenedor = document.getElementById('preview-container');
let archivoAlProcesar = [];
const btnProcesar = document.getElementById('btn-process');
const inputMarca = document.getElementById('watermark-text');
const inputAncho = document.getElementById('max-width');
const selectFormato = document.getElementById('output-format');
drop.addEventListener('dragover',function(e){
e.preventDefault();
drop.classList.add('highlight');
});
drop.addEventListener('dragleave',function(e){
e.preventDefault();
drop.classList.remove('highlight');
});
drop.addEventListener('drop',function(e){
e.preventDefault();
drop.classList.remove('highlight');
const archivos = e.dataTransfer.files;
contenedor.innerHTML ='';
Array.from(archivos).forEach(archivo =>{
    const lector = new FileReader();
    lector.onload = function(eventoLectura){
   
        const lectura = eventoLectura.target.result;
        contenedor.innerHTML+=`<div class="preview-item">
    <img src="${lectura}">
    <p>${archivo.name}</p>
</div>`;
    }
     lector.readAsDataURL(archivo);
});
archivoAlProcesar = Array.from(archivos);
})


btnProcesar.addEventListener('click',function(e){
    archivoAlProcesar.forEach(archivo =>{
          const img = new Image();
    
    img.onload = function(evento){
        const nuevoAncho = parseInt(inputAncho.value)||img.width;
        const nuevaAltura = (img.height / img.width)*nuevoAncho;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = nuevoAncho;
        canvas.height = nuevaAltura;
        const texto =inputMarca.value || "Mi App";
        ctx.drawImage(img,0,0,nuevoAncho,nuevaAltura);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'right';
        ctx.fillText(texto,canvas.width-20,canvas.height-20);
        const formato = selectFormato.value;
        canvas.toBlob((blob)=>{
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `editada-${archivo.name}`;
            link.click();
        },formato);
    }
    img.src = URL.createObjectURL(archivo);
    });
  

});

drop.addEventListener('click', () => {
    file.click(); 
});

file.addEventListener('change', function(e) {
    const archivos = e.target.files; 
    contenedor.innerHTML = ''; 
    
    Array.from(archivos).forEach(archivo => {
        const lector = new FileReader();
        
        lector.onload = function(eventoLectura) {
            const lectura = eventoLectura.target.result;
            contenedor.innerHTML += `<div class="preview-item">
                <img src="${lectura}">
                <p>${archivo.name}</p>
            </div>`;
        }
        
        lector.readAsDataURL(archivo);
    });


    archivoAlProcesar = Array.from(archivos);
});