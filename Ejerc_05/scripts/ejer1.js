function cambiarImagenPrincipal(indice) {
  const miniaturas = document.querySelectorAll(".miniatura");
  const imagenPrincipal = document.getElementById("imagen-principal");
  imagenPrincipal.src = miniaturas[indice].src;
  resaltarMiniatura(indice);
}

function resaltarMiniatura(indice) {
  const miniaturas = document.querySelectorAll(".miniatura");
  miniaturas.forEach(min => min.classList.remove("activa"));
  miniaturas[indice].classList.add("activa");
}
