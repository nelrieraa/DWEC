const usuario = {
    nombre : "Juan",
    email :  "juan@gmail.com"
}
const perfil = {
    puesto : "Desarrollador",
    empresa : "Google"
}
const empleado = {...usuario, ...perfil};
const ciudad = empleado?.perfil?.direccion?.ciudad ?? "Ciudad no especificada";
console.log(ciudad);