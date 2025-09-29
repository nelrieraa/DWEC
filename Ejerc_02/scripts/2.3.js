let saldoDisponible = 1000; // ejemplo de saldo
let tieneTarjetaDeCredito = true; // ejemplo de valor

function saldo(retirar) {
  if (saldoDisponible >= retirar) {
    console.log("Retiro exitoso, le quedan:", saldoDisponible - retirar);
    saldoDisponible -= retirar;
    return "Retiro realizado";
  } else if (tieneTarjetaDeCredito) {
    console.log("Saldo insuficiente, pagando con tarjeta de crédito");
    return "Saldo insuficiente, pago con tarjeta de crédito";
  } else {
    console.log("Saldo insuficiente");
    return "Saldo insuficiente";
  }
}