const titulo = document.getElementById("titulo");
const fecha = document.getElementById("fecha");
const imagen = document.getElementById("imagen");
const descripcion = document.getElementById("descripcion");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const btnUltimo = document.getElementById("btnUltimo");
const historial = document.getElementById("historial");

let documentoActual = "documentos/documento_ultimo.xml";
let documentoUltimo = "documentos/documento_ultimo.xml";
let historialDocs = {};

function cargarDocumento(ruta) {
  fetch(ruta)
    .then(res => res.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const id = data.querySelector("id").textContent;
      const tituloDoc = data.querySelector("titulo").textContent;
      const fechaDoc = data.querySelector("fecha").textContent;
      const imagenDoc = data.querySelector("imagen").textContent;
      const descripcionDoc = data.querySelector("descripcion").textContent;
      const siguiente = data.querySelector("siguiente").textContent;
      const anterior = data.querySelector("anterior").textContent;


      titulo.textContent = tituloDoc;
      fecha.textContent = fechaDoc;
      imagen.src = imagenDoc;
      descripcion.textContent = descripcionDoc;


      btnAnterior.disabled = anterior === "null";
      btnSiguiente.disabled = siguiente === "null";


      documentoActual = ruta;
      btnAnterior.dataset.file = anterior;
      btnSiguiente.dataset.file = siguiente;


      if (!historialDocs[ruta]) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${tituloDoc} (${fechaDoc})`;
        li.dataset.file = ruta;
        li.addEventListener("click", () => cargarDocumento(li.dataset.file));
        historial.appendChild(li);
        historialDocs[ruta] = true;
      }
    })
    .catch(() => alert("Error al cargar el documento."));
}


btnSiguiente.addEventListener("click", () => {
  if (!btnSiguiente.disabled) cargarDocumento(btnSiguiente.dataset.file);
});

btnAnterior.addEventListener("click", () => {
  if (!btnAnterior.disabled) cargarDocumento(btnAnterior.dataset.file);
});

btnUltimo.addEventListener("click", () => {
  cargarDocumento(documentoUltimo);
});


cargarDocumento(documentoUltimo);
