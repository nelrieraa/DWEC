const producto = {
    nombre : 'ordenador',
    precio : 2000
}
const cliente = {
    nombre : 'Nel',
    esPremium : true
}
const pedido = {
    ...producto,
    ...cliente
}
console.log(pedido)
// que no funcionaria
const producto2 = {
    nombre : 'horno'
}
const pedido2 = {
    ...cliente,
    ...producto2
}
console.log(pedido2)