const Contador = require("./contador");

const contador1 = new Contador("Ernesto Leimsieder");

console.log(contador1.getCuentaIndividual());
console.log(contador1.getCuentaGlobal());
console.log(contador1.getResponsable());
contador1.contar();
console.log(contador1.getCuentaIndividual());
console.log(contador1.getCuentaGlobal());
