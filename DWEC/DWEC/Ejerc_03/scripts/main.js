const {
  agregarEmpleado,
  eliminarEmpleado,
  buscarPorDepartamento,
  calcularSalarioPromedio,
  obtenerEmpleadosOrdenadosPorSalario
} = require('./empleados');

agregarEmpleado({ id: 1, nombre: 'Ana', departamento: 'Ventas', salario: 2500 });
agregarEmpleado({ id: 2, nombre: 'Luis', departamento: 'IT', salario: 3200 });
agregarEmpleado({ id: 3, nombre: 'Marta', departamento: 'IT', salario: 3100 });
agregarEmpleado({ id: 4, nombre: 'Carlos', departamento: 'RRHH', salario: 2700 });
agregarEmpleado({ id: 5, nombre: 'Sofía', departamento: 'Ventas', salario: 2600 });
agregarEmpleado({ id: 6, nombre: 'Pedro', departamento: 'IT', salario: 3300 });

console.log('Empleados en IT:', buscarPorDepartamento('IT'));
console.log('Salario promedio:', calcularSalarioPromedio());
console.log('Empleados ordenados por salario:', obtenerEmpleadosOrdenadosPorSalario());

eliminarEmpleado(2);
console.log('Empleados tras eliminar a Luis:', obtenerEmpleadosOrdenadosPorSalario());
