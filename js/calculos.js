
let verduraJugada = [];
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
    contadorTiempoJuego();
    desbloquearTablero();
}

function contadorIntentos() {
    document.querySelector('#intentos-totales').textContent = `Cantidad de intentos: ${CONTADOR_INTENTOS}`;
}

function bloquearTablero() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = function() {
        }
    });
};

function bloquearCuadro() {
    document.querySelectorAll('.en-juego').forEach(function($cuadro) {
        $cuadro.onclick = function () {

        };
    });
};

function desbloquearTablero() {
    document.querySelectorAll('.img-fluid').forEach(function($cuadro) {
        $cuadro.onclick = manejarInputUsuario;
    });
};

function mostrarImagenCuadro($imagenClickeada) {
    $imagenClickeada.className = "img-fluid en-juego";
}

function ocultarImagenCuadro() {
    $cuadrosEnJuego.forEach(function($imagenClickeada){
        $imagenClickeada.className = "img-fluid oculto";
        
    })
}

function ocultarCuadrosResueltos() {
    $cuadrosEnJuego.forEach(function(cuadroClickeado) {
        cuadroClickeado.src = "images/acierto.jpg";
        cuadroClickeado.className = "cuadro-resuelto";
    })
    document.querySelectorAll('.cuadro-resuelto').forEach(function($cuadro) {
        $cuadro.onclick = function() {
            
        }
    })
}

function manejarInputUsuario(e) {
    $imagenClickeada = e.target;
    
    if (verduraJugada.length < 2) {
        mostrarImagenCuadro($imagenClickeada);
        verduraJugada.push($imagenClickeada.src);
        $cuadrosEnJuego.push($imagenClickeada);
        manejarJugada();
    }
    
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
        imgVerdura.draggable = false;
        cuadro.appendChild(imgVerdura);
    })
}

function contadorTiempoJuego() {
    let $tiempoJuego = document.querySelector('#tiempo-juego');
    let SEGUNDOS = 0;
    let MINUTOS = 0;

    function sumarSegundos() { //Creo que quedó medio fiero pero anda
        if (CUADROS_TABLERO > 0) {
            SEGUNDOS++;
            
            if (SEGUNDOS === 60) {
                SEGUNDOS = 0;
                MINUTOS++;
            }
            
            if (SEGUNDOS.toString().length === 1) {
                SEGUNDOS = `0${SEGUNDOS}`
            }
    
            if (MINUTOS.toString().length === 1) {
                MINUTOS = `0${MINUTOS}`
            }
    
            $tiempoJuego.textContent = `Tiempo: ${MINUTOS}:${SEGUNDOS}`
        }
    }
    setInterval(sumarSegundos, 1000);
}

function mostrarVictoria() {
    //poner la clase de alert verde de bootstrap
    document.querySelector('#titulo').textContent = "GANASTE! :D"
}

function resetearJugada() {
    verduraJugada = [];
    $cuadrosEnJuego = [];
    desbloquearTablero();
}

function aciertoJugada() {
    ocultarCuadrosResueltos();
    CONTADOR_INTENTOS++;
    CUADROS_TABLERO = CUADROS_TABLERO - 2;
    
    if (CUADROS_TABLERO === 0){
        mostrarVictoria();
    }

    contadorIntentos();
    resetearJugada();
}

function errorJugada() {
    ocultarImagenCuadro();
    CONTADOR_INTENTOS++;
    contadorIntentos();
    resetearJugada();
}

function manejarJugada() {
    bloquearCuadro();
    if (verduraJugada.length === 2) {
        bloquearTablero();

        if (verduraJugada[0] === verduraJugada[1]){
            setTimeout(aciertoJugada, 500);
        } else{
            setTimeout(errorJugada, 500);
        }
    }
}