/*
Pseudo-code:

-----------------------------
Estructura:
Header
Boton jugar
Grilla de 4x4
Contador de tiempo
Contador de aciertos
-----------------------------

Arrancar con todos los cuadritos bloqueados
Al hacer click en jugar
    asignar una imagen random a cada cuadro. Tiene que existir siempre 1 par de imagenes.
    O sea, para 16 cuadritos (4x4) tienen que ser 8 imágenes de a pares asignadas random.
        (para esto un objeto con todos los href y valores a las imagenes y que asigne random de ese objeto?)
    desbloquear cuadros

Al hacer click en un cuadrito, pushear ese valor ¿clase? a un array vacío.
    el cuadrito debe tener una transition para mostrar la imagen que haya atrás
Al hacer click en otro cuadrito (if array.length === 2) chequear que array[0] y array[1] sean iguales y mientras bloquear los cuadritos
    Si no son iguales, resetear los arrays
    Si son iguales, ocultar esos cuadritos y sumar 1 acierto.

¿como saber si termino la jugada?
    llevar un contador de aciertos. Si la cantidad de aciertos === 8 significa que completó todos los pares y mostrar mensaje de éxito

*/

let jugadaUsuario = [];

function bloquearTablero() {
    document.querySelectorAll('.cuadros').forEach(function($cuadro) {
        $cuadro.onclick = function() {
            
        }
    });
};

function desbloquearTablero() {

}

function mostrarImagenCuadro() {

}

function ocultarImagenCuadro() {

}

function chequearJugadaUsuario() {

}

function generarTableroRandom() {
    let VERDURAS = {
        tomate: 'link a tomate',
        zapallo: 'link a zapallo',
        maiz: 'link a maiz',
        acelga: 'link a acelga',
        albahaca: 'link a albahaca',
        morron: 'link a morron',
        berenjena: 'link a berenjena',
        lechuga: 'link a lechuga'
    }
    let cuadrosTablero = document.querySelectorAll('.cuadro');

}

function contadorTiempoJuego() {

}

function contadorIntentosUsuario() {

}

function contadorVictoriasUsuario() {
    
}

