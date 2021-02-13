let verduraJugada = [];
let $cuadrosEnJuego = [];
let CONTADOR_INTENTOS = 0;
let $verdurasTablero = 16;
let SEGUNDOS = 0;
let MINUTOS = 0;
let VERDURAS = ["images/tomate.jpg", "images/zapallo.jpg", "images/maiz.jpg", "images/acelga.jpg", "images/albahaca.jpg", 
                "images/morron.jpg", "images/berenjena.jpg", "images/lechuga.jpg"]



bloquearTablero();

document.querySelector('#boton-jugar').onclick = function() {
    generarTableroRandom();
    contadorTiempoJuego();
    desbloquearTablero();
    deshabilitarBotonJugar();
}

document.querySelector('#boton-resetear').onclick = function() {
    resetearTablero();
}

function duplicaVerduras() {
    let verdurasDuplicadas = [];

    for (let i = 0; i < VERDURAS.length; i++) {
        verdurasDuplicadas.push(VERDURAS[i]);
        verdurasDuplicadas.push(VERDURAS[i]);
    };
    return verdurasDuplicadas;
}

function resetearTablero() {
    $verdurasTablero = 16;
    resetearJugada();
    borrarVerduras();
    resetearReloj();
    resetearIntentos();
    resetearTitulo();
    habilitarBotonJugar();
    resetearNav();
}

function resetearNav() {
    document.querySelector("nav").className = "navbar navbar-light bg-light";
    document.querySelector("nav").style.backgroundColor = '';
}

function deshabilitarBotonJugar() {
    document.querySelector('#boton-jugar').disabled = true;
}

function habilitarBotonJugar() {
    document.querySelector('#boton-jugar').disabled = false;
}

function resetearTitulo() {
    document.querySelector('#titulo').textContent = "MEMOTEST"
}

function resetearReloj() {

    if (SEGUNDOS > 0) {
        clearInterval(contadorTiempo);
        SEGUNDOS = 0;
        MINUTOS = 0;
        document.querySelector('#tiempo-juego').textContent = 'Tiempo: 00:00'
    }
}

function resetearIntentos() {
    CONTADOR_INTENTOS = 0;
    document.querySelector('#intentos-totales').textContent = `Cantidad de intentos: ${CONTADOR_INTENTOS}`;
}

function borrarVerduras() {
    let $cuadros = document.querySelectorAll('.cuadro');
    let $verduras = document.querySelectorAll('img');

    if ($verduras.length > 0) {
        $cuadros.forEach(function($cuadro) {
            $cuadro.removeChild($cuadro.firstChild)
        })
    }
}

function contadorIntentos() {
    document.querySelector('#intentos-totales').textContent = `Cantidad de intentos: ${CONTADOR_INTENTOS}`;
}

function bloquearTablero() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = function() {}
    });
};

function bloquearCuadro() {
    document.querySelectorAll('.en-juego').forEach(function($cuadro) {
        $cuadro.onclick = function() {

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
    $cuadrosEnJuego.forEach(function($imagenClickeada) {
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
    reproducirSonido();
    if (verduraJugada.length < 2) {
        mostrarImagenCuadro($imagenClickeada);
        verduraJugada.push($imagenClickeada.src);
        $cuadrosEnJuego.push($imagenClickeada);
        manejarJugada();
    }
}

function reproducirSonido() {
    let sonido = document.querySelector('#sonido-click');
    sonido.play();
}

function obtenerVerduraAleatoria($verduras) {
    let numeroRandom = Math.floor(Math.random() * $verduras.length)
    let verduraAleatoria = $verduras.splice(numeroRandom, 1)

    return verduraAleatoria
}

function generarTableroRandom() {
    let $verduras = duplicaVerduras();
    let $cuadrosTablero = document.querySelectorAll('.cuadro');
    $cuadrosTablero.forEach(function($cuadro) {
        let imgVerdura = document.createElement('img');
        imgVerdura.src = obtenerVerduraAleatoria($verduras);
        imgVerdura.className = 'img-fluid oculto';
        imgVerdura.draggable = false;
        $cuadro.appendChild(imgVerdura);
    });
}

function contadorTiempoJuego() {
    let $tiempoJuego = document.querySelector('#tiempo-juego');

    function sumarTiempo() {
        if ($verdurasTablero > 0) {
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
    contadorTiempo = setInterval(sumarTiempo, 1000);

    return contadorTiempo; 
}

function mostrarVictoria() {
    document.querySelector("nav").className = "navbar navbar-light";
    document.querySelector("nav").style.backgroundColor = "#bd00ce"
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
    $verdurasTablero = $verdurasTablero - 2;

    if ($verdurasTablero === 0) {
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

        if (verduraJugada[0] === verduraJugada[1]) {
            setTimeout(aciertoJugada, 400);
        } else {
            setTimeout(errorJugada, 400);
        }
    }
}