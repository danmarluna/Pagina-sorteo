function enviarWhatsApp(){
    if(
        boletosSeleccionados.length === 0
    ){
        alert(
            "Selecciona boletos"
        );
        return;
    }
    const mensaje =
`Hola, quiero apartar los siguientes boletos:
${boletosSeleccionados.join(", ")}
Adjunto mi comprobante de pago.`;
    const telefono =
    "523324447372";
    window.open(
        `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,
        "_blank"
    );
}