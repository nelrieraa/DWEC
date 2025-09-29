
const empleados = [];

function agregarEmpleado(empleado) {
  empleados.push(empleado);
}

function eliminarEmpleado(id) {
  const index = empleados.findIndex(e => e.id === id);
  if (index !== -1) {
    empleados.splice(index, 1);
    return true;
  }
  return false;
}

function buscarPorDepartamento(departamento) {
  return empleados.filter(e => e.departamento === departamento);
}

function calcularSalarioPromedio() {
  if (empleados.length === 0) return 0;
  return empleados.reduce((acc, e) => acc + e.salario, 0) / empleados.length;
}

function obtenerEmpleadosOrdenadosPorSalario() {
  return [...empleados].sort((a, b) => b.salario - a.salario);
}

module.exports = {
  agregarEmpleado,
  eliminarEmpleado,
  buscarPorDepartamento,
  calcularSalarioPromedio,
  obtenerEmpleadosOrdenadosPorSalario
};
