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



    Alto nivel (visual)

    Hago click en JUGAR:
        Se completa el tablero con imágenes random
        Arranca el contador de tiempo
        Se oculta el boton
    
    Hago click en un cuadrito:
        Se muestra la imagen de la verdura
    

*/

let jugadaUsuario = [];
let $cuadrosEnJuego = [];
let CONTADOR_INTENTOS = 0;
let CUADROS_TABLERO = 16;
let VERDURAS = {                      //Ver como duplicarlo desde los 8 e ir acumulando los que ya se jugaron en otra matriz
    tomate: "images/tomate.jpg",
    zapallo: "images/zapallo.jpg",
    maiz: "images/maiz.jpg",
    acelga: "images/acelga.jpg",
    albahaca: "images/albahaca.jpg",
    morron: "images/morron.jpg",
    berenjena: "images/berenjena.jpg",
    lechuga: "images/lechuga.jpg",
    tomate2: "images/tomate.jpg",
    zapallo2: "images/zapallo.jpg",
    maiz2: "images/maiz.jpg",
    acelga2: "images/acelga.jpg",
    albahaca2: "images/albahaca.jpg",
    morron2: "images/morron.jpg",
    berenjena2: "images/berenjena.jpg",
    lechuga2: "images/lechuga.jpg"
}
let values = Object.values(VERDURAS);

bloquearTablero();

document.querySelector('#boton-jugar').onclick = function() {
    generarTableroRandom();
    // contadorTiempoJuego();
    desbloquearTablero();
}

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

function mostrarImagenCuadro($imagenClickeada) {
    $imagenClickeada.className = "img-fluid en-juego";
    //agrega un <img src="images/zapallo.jpg" class="img-fluid"> como textContent del cuadro? y transition
}

function ocultarImagenCuadro() {
    $cuadrosEnJuego.forEach(function($imagenClickeada){
        $imagenClickeada.className = "img-fluid oculto";
    })
}

function ocultarCuadrosResueltos() {
    $cuadrosEnJuego.forEach(function(cuadroClickeado) {
        cuadroClickeado.src = "images/acierto.jpg";
    })
}

function manejarInputUsuario(e) {
    $imagenClickeada = e.target;
    mostrarImagenCuadro($imagenClickeada);
    jugadaUsuario.push($imagenClickeada.src);
    $cuadrosEnJuego.push($imagenClickeada);
    //acá ver como remover el event y después al finalizar el chequeo volver a asignarlo
    $imagenClickeada.onclick = function() {
    };
    manejarJugada(jugadaUsuario);
}

function obtenerVerduraAleatoria() {    
    let numeroRandom = Math.floor(Math.random() * values.length)
    let verduraAleatoria = values.splice(numeroRandom, 1)

    return verduraAleatoria
}

function generarTableroRandom() {
    let cuadrosTablero = document.querySelectorAll('.cuadro');
    cuadrosTablero.forEach(function(cuadro) {
        let imgVerdura = document.createElement('img');
        imgVerdura.src = obtenerVerduraAleatoria();
        imgVerdura.className = 'img-fluid oculto';
        cuadro.appendChild(imgVerdura);
    })
}

// function contadorTiempoJuego() {
//     //Al hacer click en jugar comenzar el contador, finaliza cuando se agotan los cuadros.
//     let $tiempoJuego = document.querySelector('#tiempo-juego');

//     while (CUADROS_TABLERO > 0) {
//         setTimeout
//     }
// }

function mostrarVictoria() {
    //poner la clase de alert verde de bootstrap
    document.querySelector('#titulo').textContent = "GANASTE! :D"
}

function resetearMovimiento() {
    jugadaUsuario = [];
    $cuadrosEnJuego = [];
    desbloquearTablero();
}

function aciertoJugada() {
    CONTADOR_INTENTOS = 0;
    ocultarCuadrosResueltos();
    CUADROS_TABLERO = CUADROS_TABLERO - 2;
    resetearMovimiento();
}

function errorJugada() {
    CONTADOR_INTENTOS++;
    ocultarImagenCuadro();
    resetearMovimiento();
}

function manejarJugada() {
    if (jugadaUsuario.length === 2) {
        bloquearTablero();

        if (jugadaUsuario[0] === jugadaUsuario[1]){
            setTimeout(aciertoJugada, 500);

            if (CUADROS_TABLERO === 0){
                  mostrarVictoria();//NO ANDA, WHY
            }
        } else{
            setTimeout(errorJugada, 500);
        }
        $cuadrosEnJuego[0].onclick = manejarInputUsuario;
        $cuadrosEnJuego[1].onclick = manejarInputUsuario;
    }
    //acá devolver el event a los img
}