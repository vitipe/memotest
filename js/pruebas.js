let VERDURAS = {
    tomate: "images/tomate.jpg",
    zapallo: "images/zapallo.jpg",
    maiz: "images/maiz.jpg",
    acelga: "images/acelga.jpg",
    albahaca: "images/albahaca.jpg",
    morron: "images/morron.jpg",
    berenjena: "images/berenjena.jpg",
    lechuga: "images/lechuga.jpg",
    tomate: "images/tomate.jpg",
    zapallo: "images/zapallo.jpg",
    maiz: "images/maiz.jpg",
    acelga: "images/acelga.jpg",
    albahaca: "images/albahaca.jpg",
    morron: "images/morron.jpg",
    berenjena: "images/berenjena.jpg",
    lechuga: "images/lechuga.jpg"
}

let verdurasValues = Object.values(VERDURAS);

function tableroRandom() {
    let numeroRandom = Math.floor(Math.random() * 16)

    for(let i = 1; i <= 16;i++) {
        let imagenJugada = document.querySelector(`imagen-${numeroRandom}`);
        if (imagenJugada.src === '') {
            imagenJugada.src = verdurasValues.pop();
            verdurasValues.pop();
        } else {
            tableroRandom();
        }
}