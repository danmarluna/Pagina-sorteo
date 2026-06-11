let boletos = [];
let boletosSeleccionados = [];
const listaBoletos =
document.getElementById(
    "listaBoletos"
);

async function cargarBoletos(){
    try{
        const respuesta =
        await fetch(
            "../data/boletos.json"
        );
        boletos =
        await respuesta.json();
        renderBoletos(
            boletos
        );
    }catch(error){
        console.error(
            error
        );
    }
}
cargarBoletos();

function renderBoletos(lista){
    listaBoletos.innerHTML = "";
    lista.forEach(numero => {
        const div =
        document.createElement(
            "div"
        );
        div.classList.add(
            "boleto"
        );
        div.textContent =
        numero;
        if(
            boletosSeleccionados.includes(
                numero
            )
        ){
            div.classList.add(
                "seleccionado"
            );
        }
        div.addEventListener(
            "click",
            () =>
            seleccionarBoleto(
                numero
            )
        );
        listaBoletos.appendChild(
            div
        );
    });
}

function seleccionarBoleto(
    numero
){
    if(
        boletosSeleccionados.includes(
            numero
        )
    ){
        boletosSeleccionados =
        boletosSeleccionados.filter(
            b =>
            b !== numero
        );
    }else{
        boletosSeleccionados.push(
            numero
        );
    }
    actualizarBarra();
    renderBoletos(
        boletos
    );
}

function actualizarBarra(){
    const barra =
    document.getElementById(
        "barraSeleccion"
    );
    if(
        boletosSeleccionados.length === 0
    ){
        barra.style.display =
        "none";
        return;
    }
    barra.style.display =
    "block";
    barra.innerHTML =
    `
    <h3>
        Tus boletos
    </h3>
    <div class="listaSeleccionados">
        ${
            boletosSeleccionados
            .map(numero =>
                `<span
                    class="boletoSeleccionado"
                    onclick="quitarBoleto('${numero}')">
                    ${numero} ✖
                </span>`
            )
            .join("")
        }
    </div>
    <br>
    <button onclick="enviarWhatsApp()">
        Apartar por WhatsApp
    </button>
    <button onclick="limpiarSeleccion()">
        Limpiar
    </button>
    `;
}

function quitarBoleto(numero){
    boletosSeleccionados =
    boletosSeleccionados.filter(
        b =>
        b !== numero
    );
    actualizarBarra();
    renderBoletos(
        boletos
    );

}

function limpiarSeleccion(){
    boletosSeleccionados = [];
    actualizarBarra();
    renderBoletos(
        boletos
    );
}

function usarSuerte(){
    const cantidad =
    parseInt(
        document.getElementById(
            "cantidadSuerte"
        ).value
    );
    const copia =
    [...boletos];
    copia.sort(
        () =>
        Math.random() - 0.5
    );
    boletosSeleccionados =
    copia.slice(
        0,
        cantidad
    );
    actualizarBarra();
    renderBoletos(
        boletos
    );
}

function buscarBoletos(){
    const texto =
    document
    .getElementById(
        "textoBusqueda"
    )
    .value;
    const tipo =
    document
    .getElementById(
        "tipoBusqueda"
    )
    .value;
    let resultado = [];
    switch(tipo){
        case "contiene":
            resultado =
            boletos.filter(
                b =>
                b.includes(texto)
            );
            break;
        case "empieza":
            resultado =
            boletos.filter(
                b =>
                b.startsWith(texto)
            );
            break;
        case "termina":
            resultado =
            boletos.filter(
                b =>
                b.endsWith(texto)
            );
            break;
        case "igual":
            resultado =
            boletos.filter(
                b =>
                b === texto
            );
            break;
    }
    renderBoletos(
        resultado
    );
}

