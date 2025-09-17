const coche = {
marca : "Ford",
modelo : "Fiesta",
año : 2006,
estaDisponible : false,
color : "Rojo"
}
const { marca, modelo } = coche

console.log("Marca",marca)
console.log("Modelo",modelo)
 console.table(coche)
coche.estaDisponible = true
delete coche.año
console.table(coche)