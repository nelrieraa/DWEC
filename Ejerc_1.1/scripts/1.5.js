const estudiantes = [nombre = String apellidos  = String calificacion = Number aprobado = Boolean]
const estudiantes = [
  {
    nombre: "Ana",
    apellidos: "García",
    calificacion: 8.5,
    aprobado: true
  },
  {
    nombre: "Luis",
    apellidos: "Martínez",
    calificacion: 6.2,
    aprobado: true
  },
  {
    nombre: "Sofía",
    apellidos: "López",
    calificacion: 4.9,
    aprobado: false
  }
]
const estudiantesConId = estudiantes.map((estudiante , index)=>){
    ...estudiante,
    id: index + 1
}
console.log(estudiantesConId)
const estudianteaprobados = estudiantes.filter(estudiante => calificacion >=5)
console.log(estudianteaprobados)
estudianteAprobados.forEach(estudiante => {
  console.log(`¡Felicidades ${estudiante.nombre}, has aprobado con ${estudiante.calificacion}!`)
})
estudiantes.forEach(estudiante => {
  const esAprobadoCorrecto = (estudiante.calificacion >= 5 && estudiante.aprobado === true) ||
                             (estudiante.calificacion < 5 && estudiante.aprobado === false)
  if (!esAprobadoCorrecto) {
    console.log(`⚠️ Incoherencia en el registro de ${estudiante.nombre}: calificación = ${estudiante.calificacion}, aprobado = ${estudiante.aprobado}`)
  }
})