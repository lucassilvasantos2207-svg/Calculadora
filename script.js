const display = document.getElementById("current-operation");
const operacaoDisplay = document.getElementById("previous-operation");

let numero1 = "";
let numero2 = "";
let operador = "";

const numeros = document.querySelectorAll(".number");
const operadores = document.querySelectorAll(".operator");
const igual = document.querySelector(".equals");
const limpar = document.querySelector(".clear");
const apagar = document.querySelector(".delete");


// Números
numeros.forEach(function(botao) {

    botao.addEventListener("click", function() {

        numero1 = numero1 + botao.textContent;

        display.textContent = numero1;

    });

});


// Operadores
operadores.forEach(function(botao) {

    botao.addEventListener("click", function() {

        if (numero1 === "") {
            return;
        }

        // Se já existe uma operação, calcula primeiro
        if (numero2 !== "" && operador !== "") {

            calcular();

        } else {

            numero2 = numero1;

        }

        operador = botao.textContent;
        numero1 = "";

        operacaoDisplay.textContent = numero2 + " " + operador;

        display.textContent = "0";

    });

});


// Botão igual
igual.addEventListener("click", function() {

    if (numero2 === "" || numero1 === "") {
        return;
    }

    calcular();

});


// Função para calcular
function calcular() {

    let valor1 = Number(numero2);
    let valor2 = Number(numero1);
    let resultado;

    if (operador === "+") {
        resultado = valor1 + valor2;
    }

    else if (operador === "−") {
        resultado = valor1 - valor2;
    }

    else if (operador === "×") {
        resultado = valor1 * valor2;
    }

    else if (operador === "÷") {

        if (valor2 === 0) {
            display.textContent = "Erro";
            return;
        }

        resultado = valor1 / valor2;

    }

    else if (operador === "%") {
        resultado = valor1 % valor2;
    }

    operacaoDisplay.textContent =
        numero2 + " " + operador + " " + numero1;

    display.textContent = resultado;

    // O resultado vira o primeiro número da próxima operação
    numero2 = String(resultado);
    numero1 = "";
}


// Botão AC
limpar.addEventListener("click", function() {

    numero1 = "";
    numero2 = "";
    operador = "";

    display.textContent = "0";
    operacaoDisplay.textContent = "";

});


// Botão apagar
// Botão apagar
apagar.addEventListener("click", function() {

    // Apaga o último número digitado
    if (numero1 !== "") {

        numero1 = numero1.slice(0, -1);

        if (numero1 === "") {
            display.textContent = "0";
        } else {
            display.textContent = numero1;
        }

        return;
    }

    // Se não tem número, apaga o operador
    if (operador !== "") {

        operador = "";
        operacaoDisplay.textContent = numero2;

        return;
    }

    // Se não tem operador, apaga o número anterior
    if (numero2 !== "") {

        numero2 = numero2.slice(0, -1);

        if (numero2 === "") {
            display.textContent = "0";
            operacaoDisplay.textContent = "";
        } else {
            display.textContent = numero2;
            operacaoDisplay.textContent = "";
        }

    }

});
// Teclado do computador
document.addEventListener("keydown", function(event) {

    const tecla = event.key;

    // Números
    if (tecla >= "0" && tecla <= "9") {

        numero1 = numero1 + tecla;
        display.textContent = numero1;

    }

    // Ponto decimal
    else if (tecla === ".") {

        if (!numero1.includes(".")) {
            numero1 = numero1 + ".";
            display.textContent = numero1;
        }

    }

    // Operações
    else if (
        tecla === "+" ||
        tecla === "-" ||
        tecla === "*" ||
        tecla === "/" ||
        tecla === "%"
    ) {

        if (numero1 === "") {
            return;
        }

        numero2 = numero1;
        numero1 = "";

        if (tecla === "+") {
            operador = "+";
        }

        else if (tecla === "-") {
            operador = "−";
        }

        else if (tecla === "*") {
            operador = "×";
        }

        else if (tecla === "/") {
            operador = "÷";
        }

        else if (tecla === "%") {
            operador = "%";
        }

        operacaoDisplay.textContent = numero2 + " " + operador;
        display.textContent = "0";

    }

    // Enter = resultado
    else if (tecla === "Enter") {

        igual.click();

    }

    // Backspace = apagar
    else if (tecla === "Backspace") {

        apagar.click();

    }

    // Escape = limpar
    else if (tecla === "Escape") {

        limpar.click();

    }

});
