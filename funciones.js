console.log("Primer paso")

function saludar(){
    console.log("Segundo paso")
    console.log("Hola mundo")
}

console.log("Tercer paso")

saludar();

// Función flecha.

const saludar2 = () => {
    console.log("Hola mundo 2")
}

saludar2();

const sumar = (valor1, valor2) => {
    return valor1 + valor2;
}

// Cuando la función tiene una sola línea de código.
const restar = (valor1, valor2) => valor1 - valor2;

const multiplicar = (valor1, valor2) => {
    return valor1 * valor2;
}
const dividir = (valor1, valor2) => {
    return valor1 / valor2;
}

console.log(sumar(16,8));
console.log(restar(16,8));
console.log(multiplicar(16,8));
console.log(dividir(16,8));
