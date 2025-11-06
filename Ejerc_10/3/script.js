const inputCodigo = document.getElementById("codigo");
const inputClave = document.getElementById("clave");
const msgCodigo = document.getElementById("codigoMsg");
const msgClave = document.getElementById("claveMsg");
const btnAcceder = document.getElementById("btnAcceder");
const resultado = document.getElementById("resultado");

let agenteValido = null; 
let claveValida = false;


async function cargarXML() {
  const response = await fetch("personal.xml");
  const texto = await response.text();
  return new window.DOMParser().parseFromString(texto, "text/xml");
}

inputCodigo.addEventListener("blur", async () => {
  const codigo = inputCodigo.value.trim();
  msgCodigo.textContent = "";
  msgCodigo.className = "";


  agenteValido = null;
  claveValida = false;
  inputClave.value = "";
  inputClave.disabled = true;
  btnAcceder.disabled = true;
  msgClave.textContent = "";
  msgClave.className = "";

  if (codigo === "") return;

  const xml = await cargarXML();
  const agente = xml.querySelector(`agente[codigo="${codigo}"]`);

  if (agente) {
    const nombre = agente.querySelector("nombre").textContent;
    msgCodigo.textContent = `Bienvenido, ${nombre}`;
    msgCodigo.className = "ok";
    agenteValido = agente;
    inputClave.disabled = false;
  } else {
    msgCodigo.textContent = "Código de agente no reconocido";
    msgCodigo.className = "error";
  }
});


inputClave.addEventListener("blur", () => {
  const clave = inputClave.value.trim();
  msgClave.textContent = "";
  msgClave.className = "";

  if (!agenteValido) return;

  const claveCorrecta = agenteValido.querySelector("clave").textContent;

  if (clave === claveCorrecta) {
    msgClave.textContent = "Clave correcta";
    msgClave.className = "ok";
    claveValida = true;
    btnAcceder.disabled = false;
  } else {
    msgClave.textContent = "Clave incorrecta";
    msgClave.className = "error";
    claveValida = false;
    btnAcceder.disabled = true;
  }
});


btnAcceder.addEventListener("click", () => {
  if (agenteValido && claveValida) {
    const nombre = agenteValido.querySelector("nombre").textContent;
    resultado.innerHTML = `<div class="alert alert-success">✅ Acceso concedido, agente ${nombre}.</div>`;
  } else {
    resultado.innerHTML = `<div class="alert alert-danger">❌ Acceso denegado.</div>`;
  }
});
