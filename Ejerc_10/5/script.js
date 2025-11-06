let xmlData = null;
const baseSelect = document.getElementById("base");
const mezclaSelect = document.getElementById("mezcla");
const resultadoDiv = document.getElementById("resultado");
const historial = document.getElementById("historial");
const btn = document.getElementById("sintetizar");


window.addEventListener("DOMContentLoaded", () => {
  fetch("recetas.xml")
    .then(res => res.text())
    .then(data => {
      const parser = new DOMParser();
      xmlData = parser.parseFromString(data, "application/xml");
      llenarSelects();
    })
    .catch(err => console.error("Error al cargar XML:", err));
});


function llenarSelects() {
  const bases = new Set();
  const mezclas = new Set();

  xmlData.querySelectorAll("aleacion").forEach(a => {
    bases.add(a.querySelector("base").textContent.trim());
    mezclas.add(a.querySelector("mezcla").textContent.trim());
  });

  for (const b of bases) {
    const opt = document.createElement("option");
    opt.value = b;
    opt.textContent = b;
    baseSelect.appendChild(opt);
  }

  for (const m of mezclas) {
    const opt = document.createElement("option");
    opt.value = m;
    opt.textContent = m;
    mezclaSelect.appendChild(opt);
  }
}


btn.addEventListener("click", () => {
  const base = baseSelect.value;
  const mezcla = mezclaSelect.value;
  const aleaciones = xmlData.querySelectorAll("aleacion");
  let encontrada = null;

  aleaciones.forEach(a => {
    const b = a.querySelector("base").textContent.trim();
    const m = a.querySelector("mezcla").textContent.trim();
    if (b === base && m === mezcla) encontrada = a;
  });

  if (encontrada) {
    const resultado = encontrada.querySelector("resultado").textContent;
    const descripcion = encontrada.querySelector("descripcion").textContent;
    mostrarResultado(`${base} + ${mezcla} = <strong>${resultado}</strong><br>${descripcion}`, true);
    agregarHistorial(base, mezcla, resultado);
  } else {
    mostrarResultado("❌ Combinación no válida. No se ha producido ninguna aleación.", false);
  }
});


function mostrarResultado(texto, exito) {
  resultadoDiv.style.display = "block";
  resultadoDiv.className = exito ? "alert alert-success mt-4 text-center" : "alert alert-danger mt-4 text-center";
  resultadoDiv.innerHTML = texto;
}


function agregarHistorial(base, mezcla, resultado) {
  const li = document.createElement("li");
  li.classList.add("list-group-item", "bg-dark", "text-light");
  li.textContent = `${base} + ${mezcla} = ${resultado}`;
  li.addEventListener("click", () => {
    baseSelect.value = base;
    mezclaSelect.value = mezcla;
    const aleacion = Array.from(xmlData.querySelectorAll("aleacion")).find(a =>
      a.querySelector("base").textContent.trim() === base &&
      a.querySelector("mezcla").textContent.trim() === mezcla
    );
    if (aleacion) {
      const desc = aleacion.querySelector("descripcion").textContent;
      mostrarResultado(`${base} + ${mezcla} = <strong>${resultado}</strong><br>${desc}`, true);
    }
  });
  historial.appendChild(li);
}
