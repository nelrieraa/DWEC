document.addEventListener("DOMContentLoaded", () => {
  const precioTotal = document.getElementById("precio");
  const radiosTamaño = document.querySelectorAll('input[name="tamaño"]');
  const extras = document.querySelectorAll('.extra');
  const masa = document.getElementById("masa");
  const btnPedido = document.getElementById("btnPedido");

  function actualizarPrecio() {
    let total = 0;


    const tamañoSeleccionado = document.querySelector('input[name="tamaño"]:checked');
    if (tamañoSeleccionado) {
      total += parseFloat(tamañoSeleccionado.value);
    }

   
    total += parseFloat(masa.value);

   
    extras.forEach(extra => {
      if (extra.checked) {
        total += parseFloat(extra.value);
      }
    });

    precioTotal.textContent = total.toFixed(2);
  }


  [...radiosTamaño, ...extras].forEach(el => el.addEventListener('change', actualizarPrecio));
  masa.addEventListener('change', actualizarPrecio);

  // Pedido final
  btnPedido.addEventListener("click", () => {
    const tamaño = document.querySelector('input[name="tamaño"]:checked').nextSibling.textContent.trim();
    const masaSeleccionada = masa.options[masa.selectedIndex].text;
    const extrasSeleccionados = [...extras]
      .filter(extra => extra.checked)
      .map(extra => extra.nextSibling.textContent.trim());

    let resumen = `Tamaño: ${tamaño}\nMasa: ${masaSeleccionada}\n`;

    resumen += extrasSeleccionados.length > 0
      ? `Extras: ${extrasSeleccionados.join(", ")}\n`
      : "Sin ingredientes extra\n";

    resumen += `\nPrecio Total: ${precioTotal.textContent} €`;

    alert(resumen);
  });

 
  actualizarPrecio();
});
