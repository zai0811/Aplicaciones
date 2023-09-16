function calcularIMC() {
    const peso = document.getElementById("peso").value.replace(',', '.');
    const altura = document.getElementById("altura").value.replace(',', '.');

  

    // en caso de que los valores no sean numeros o menores a 0 muestra un mensaje
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        alert("Por favor, ingresa valores válidos para peso y altura.");
        return;
    }



    const imc = peso / (altura * altura);

    let resultado = ` <strong >IMC= </strong>${Math.round(imc)}   <strong >Estado= </strong> `;

    if (imc < 18.5) {
        resultado += "Peso insuficiente";
    } else if (imc < 24.9) {
        resultado += "Peso saludable";
    } else if (imc < 29.9) {
        resultado += "Sobrepeso";
    } else if (imc < 34.9) {
        resultado += "Obesidad grado 1";
    } else if (imc < 39.9) {
        resultado += "Obesidad grado 2";
    } else {
        resultado += "Obesidad grado 3";
    }

    document.getElementById("resultado").innerHTML = resultado;
}

document.getElementById("calcular").addEventListener("click", function (event) {
    event.preventDefault(); // evita que la pagina se recargue automaticamente 

    calcularIMC();

});
