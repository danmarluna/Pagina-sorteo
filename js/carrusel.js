const carrusel =
document.querySelector(
".carrusel-desplazables"
);

const imagenes =
document.querySelectorAll(
".carrusel-desplazables img"
);

let indice = 0;

function actualizarCarrusel(){
    carrusel.style.transform =
    `translateX(-${indice * 100}%)`;
}

function siguiente(){
    indice++;
    if(indice >= imagenes.length){
        indice = 0;
    }
    actualizarCarrusel();
}

function anterior(){
    indice--;
    if(indice < 0){
        indice =
        imagenes.length - 1;
    }
    actualizarCarrusel();
}

setInterval(() => {
    siguiente();
}, 5000);