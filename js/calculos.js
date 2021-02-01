/*

La idea es usar estrategias como las de Fabri en su simon. Ver como integrarlas acá:
-function vacia para bloquear la jugada del usuario
-e.target para manejar los clicks del input de usuario


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
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = function() {
        }
    });
};

function desbloquearTablero() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = manejarInputUsuario;
    });
};

function mostrarImagenCuadro() {
    //agrega un <img src="images/zapallo.jpg" class="img-fluid"> como textContent del cuadro? y transition
}

function ocultarCuadroResuelto() {
    //agregar el .oculto, o directamente borrar el div al carajo?
}

function manejarInputUsuario(e) {
    let $cuadroClickeado = e.target;
    mostrarImagenCuadro($cuadroClickeado);
    //Pushear cuadriclickeado
}

function obtenerVerduraAleatoria() {
    let VERDURAS = {
        tomate: "images/tomate.jpg",
        zapallo: "images/zapallo.jpg",
        maiz: "images/maiz.jpg",
        acelga: "images/acelga.jpg",
        albahaca: "images/albahaca.jpg",
        morron: "images/morron.jpg",
        berenjena: "images/berenjena.jpg",
        lechuga: "images/lechuga.jpg"
    }

    //tengo que iterar sobre los keys
    let values = Object.values(VERDURAS);
    let numeroRandom = Math.ceil(Math.random() * values.length)

    return values[numeroRandom];
}

function obtenerCuadroAleatorio() {
    let cuadrosTablero = document.querySelectorAll('.cuadro');
    let cuadroAleatorio = Math.ceil(Math.random() * cuadrosTablero.length);

    return cuadroAleatorio;
}

function generarTableroRandom() {
    
    obtenerVerduraAleatoria();
    obtenerCuadroAleatorio();
    //Aca probablemetne tendría que hacer que por cada asignación se asigne dos veces, y que borre ese key del objeto.
}

function contadorTiempoJuego() {
    //Al hacer click en jugar comenzar el contador, finaliza cuando se agotan los cuadros.
}

function contadorIntentosUsuario() {
    //If errorJugada contador++
}

function contadorVictoriasUsuario() {
    //Tendre que ir eliminando los divs? y que cuando el length de querySelectorAll(.cuadros) sea 0 contar 1 victoria
}

function mostrarVictoria() {

}

document.querySelector('#boton-jugar').onclick = function() {
    generarTableroRandom();
    contadorTiempoJuego();
    contadorIntentosUsuario();
}