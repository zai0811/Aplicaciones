const tablero = document.getElementById("tablero");
let jugadorActual = "X";
let celdas = [null, null, null, null, null, null, null, null, null]; // Inicialmente, todas las celdas están vacías (null)

// Define las combinaciones ganadoras como un arreglo de arreglos de booleanos.
const combinacionesGanadoras = [
    [true, true, true, false, false, false, false, false, false], // fila superior
    [false, false, false, true, true, true, false, false, false], // fila media
    [false, false, false, false, false, false, true, true, true], // fila inferior
    [true, false, false, true, false, false, true, false, false], // columna izquierda
    [false, true, false, false, true, false, false, true, false], // columna central
    [false, false, true, false, false, true, false, false, true], // columna derecha
    [true, false, false, false, true, false, false, false, true], // diagonal de izquierda a derecha
    [false, false, true, false, true, false, true, false, false]  // diagonal de derecha a izquierda
];

// función para verificar si un jugador ha ganado
function verificarGanador(jugador) {
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        const combinacion = combinacionesGanadoras[i];
        let ganador = true;

        // comprobar si todas las condiciones de la combinación se cumplen para el jugador actual
        for (let j = 0; j < combinacion.length; j++) {
            // Comprobar si la celda actual (j) en la combinación ganadora coincide con el jugador actual (X o O).
            // Si no coincide, establecer ganador en falso y salir del bucle.
            if (combinacion[j] && celdas[j] !== jugador) {
                ganador = false;
                break;
            }
        }

        // si encontramos un ganador, devolvemos true
        if (ganador) {
            return true;
        }
    }

    // si no hay ganador en ninguna combinación, devolvemos false
    return false;
}

// función para verificar si el tablero está completo (empate)
function tableroCompleto() {
    let completo = true;
    for (let i = 0; i < celdas.length; i++) {
        // Comprobar si la celda actual (i) está vacía (null).
        // Si está vacía, el tablero aún no está completo, cambia el estdo a falso y sale del bucle.
        if (celdas[i] == null) {
            completo = false;
            break;
        }
    }
    return completo;
}

// función para que el oponente (automático) haga un movimiento
function movimientoOponente() {
    const celdasDisponibles = [];
    for (let i = 0; i < celdas.length; i++) {
        // Si la celda actual (i) está vacía (null), agregar su índice a las celdas disponibles.
        if (celdas[i] === null) {
            celdasDisponibles.push(i);
        }
    }

    // si no hay celdas disponibles, el oponente no hace ningún movimiento
    if (celdasDisponibles.length === 0) {
        return;
    }

    // seleccionar una celda disponible al azar para colocar "O"
    const indiceAleatorio = Math.floor(Math.random() * celdasDisponibles.length);
    const indiceCeldaSeleccionada = celdasDisponibles[indiceAleatorio];
    celdas[indiceCeldaSeleccionada] = "O";
    actualizarTablero();
    jugadorActual = "X";
    // Comprobar si el oponente (O) ha ganado y mostrar un mensaje si es así.
    // También comprobar si el tablero está completo y mostrar un mensaje de empate si es así.
    if (verificarGanador("O")) {
        setTimeout(() => alert("¡El oponente (O) ganó!"), 100);
    } else if (tableroCompleto()) {
        setTimeout(() => alert("Empate"), 100);
    }
}

// función para actualizar el tablero en la interfaz gráfica
function actualizarTablero() {
    tablero.innerHTML = "";
    for (let i = 0; i < celdas.length; i++) {
        const celdaElemento = document.createElement("div");
        celdaElemento.classList.add("celda");
        celdaElemento.textContent = celdas[i];
        celdaElemento.addEventListener("click", () => {
            // Comprobar si la celda actual (i) está vacía (null) y si es el turno del jugador actual (X).
            // Si es así, colocar "X" en la celda, actualizar el tablero, cambiar al turno del oponente (O),
            // y comprobar si el jugador (X) ha ganado o si el tablero está completo.
            if (celdas[i] == null && jugadorActual == "X") {
                celdas[i] = "X";
                actualizarTablero();
                jugadorActual = "O";
                if (verificarGanador("X")) {
                    setTimeout(() => alert("¡Ganaste (X)!"), 100);
                } else if (tableroCompleto()) {
                    setTimeout(() => alert("Empate"), 100);
                } else {
                    movimientoOponente();
                }
            }
        });
        tablero.appendChild(celdaElemento);
    }
}
// Agrega un event listener al botón de reinicio
const botonReiniciar = document.getElementById("reiniciar");
botonReiniciar.addEventListener("click", reiniciarJuego);

// Función para reiniciar el juego
function reiniciarJuego() {
    // Establece todos los valores de las celdas en null
    for (let i = 0; i < celdas.length; i++) {
        celdas[i] = null;
    }

    // Reinicia el jugador actual a "X"
    jugadorActual = "X";

    // Actualiza el tablero
    actualizarTablero();
}

// iniciar el juego
actualizarTablero();
