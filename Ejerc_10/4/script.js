let indice = 1; // Comenzamos con el primer fragmento
const totalFragmentos = 3;

const btnEmpezar = document.getElementById("btnEmpezar");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const contenido = document.getElementById("contenido");
const clave = document.getElementById("clave");

// Cargar fragmento por número
function cargarFragmento(num) {
  fetch(`fragmentos/fragmento${num}.xml`)
    .then(res => {
      if (!res.ok) throw new Error("Error al cargar el fragmento");
      return res.text();
    })
    .then(xmlText => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "application/xml");
      const texto = xml.getElementsByTagName("texto")[0].textContent;
      contenido.innerHTML = `<p>${texto}</p>`;
    })
    .catch(err => {
      contenido.innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
}

// Eventos de botones
btnEmpezar.addEventListener("click", () => {
  indice = 1;
  cargarFragmento(indice);
});

btnSiguiente.addEventListener("click", () => {
  if (indice < totalFragmentos) {
    indice++;
    cargarFragmento(indice);
  }
});

btnAnterior.addEventListener("click", () => {
  if (indice > 1) {
    indice--;
    cargarFragmento(indice);
  }
});

// 👉 Evento clave: al hacer clic en "VERDAD"
clave.addEventListener("click", () => {
  indice = 2;
  cargarFragmento(indice);
});
