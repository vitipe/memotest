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

bloquearTablero();

document.querySelector('#boton-jugar').onclick = function() {
    generarTableroRandom();
    contadorTiempoJuego();
    contadorIntentosUsuario();
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

// function() {
//     document.querySelectorAll('img').forEach(function(imgVerdura) {
//         imgVerdura.className = 'img-fluid en-juego';

function mostrarImagenCuadro($imagenClickeada) {
    $imagenClickeada.className = "img-fluid en-juego";
    //agrega un <img src="images/zapallo.jpg" class="img-fluid"> como textContent del cuadro? y transition
}

function ocultarCuadroResuelto() {
    //agregar el .oculto, o directamente borrar el div al carajo?
}

function manejarInputUsuario(e) {
    $imagenClickeada = e.target;
    mostrarImagenCuadro($imagenClickeada);
    jugadaUsuario.push($imagenClickeada);
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
    let numeroRandom = Math.floor(Math.random() * values.length)

    return values[numeroRandom];
}

function generarTableroRandom() {
    let cuadrosTablero = document.querySelectorAll('.cuadro');
    cuadrosTablero.forEach(function(cuadro) {
        let imgVerdura = document.createElement('img');
        imgVerdura.src = obtenerVerduraAleatoria();
        imgVerdura.className = 'img-fluid oculto';
        cuadro.appendChild(imgVerdura);
        console.log(cuadro.value + imgVerdura.src)
    })
    //Aca probablemetne tendría que hacer que por cada asignación se asigne dos veces, y que borre ese key del objeto.
    //La otra aca es ya tener los <img> creados y solo asignar el .src, decidir cual conviene
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
