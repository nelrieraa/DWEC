const cursos = [
  {
    nombre: "Matemáticas",
    profesor: "Laura",
    estudiantes: [
      { nombre: "Ana", calificacion: 8 },
      { nombre: "Luis", calificacion: 7.5 },
      { nombre: "Sofía", calificacion: 6 }
    ]
  },
  {
    nombre: "Historia",
    profesor: "Carlos",
    estudiantes: [
      { nombre: "Pedro", calificacion: 9 },
      { nombre: "María", calificacion: 8.5 },
      { nombre: "Juan", calificacion: 7 }
    ]
  },
  {
    nombre: "Inglés",
    profesor: "Marta",
    estudiantes: [
      { nombre: "Lucía", calificacion: 5 },
      { nombre: "Miguel", calificacion: 3 },
      { nombre: "Elena", calificacion: 6 }
    ]
  },
  {
    nombre: "Física",
    profesor: "Andrés",
    estudiantes: [
      { nombre: "Sara", calificacion: 7.5 },
      { nombre: "David", calificacion: 8 },
      { nombre: "Paula", calificacion: 9 }
    ]
  }
]


const resumenCursos = cursos.map(curso => {
  const suma = curso.estudiantes.reduce((acc, est) => acc + est.calificacion, 0)
  const promedio = suma / curso.estudiantes.length
  return {
    nombreCurso: curso.nombre,
    promedioCalificaciones: promedio
  }
})

const cursosDestacados = resumenCursos.filter(curso => curso.promedioCalificaciones >= 7)


cursosDestacados.forEach(curso => {
  console.log(`📘 El curso ${curso.nombreCurso} tiene un promedio de ${curso.promedioCalificaciones.toFixed(2)} y es considerado destacado.`)
})

cursos.forEach(curso => {
  const hayBajas = curso.estudiantes.some(est => est.calificacion < 4)
  if (hayBajas) {
    console.log(`⚠️ Atención: En el curso ${curso.nombre} hay estudiantes con calificaciones muy bajas.`)
  }