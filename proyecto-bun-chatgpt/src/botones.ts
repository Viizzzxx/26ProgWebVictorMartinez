export interface ConfiguracionBoton {
    texto: string;
    clase: string;
    desactivado: boolean;
}

export function crearBoton(configuracion: ConfiguracionBoton): HTMLButtonElement {
    const boton: HTMLButtonElement = document.createElement("button");

    boton.textContent = configuracion.texto;
    boton.className = configuracion.clase;
    boton.type = "submit";
    boton.disabled = configuracion.desactivado;

    return boton;
}

export function crearBotonEnviar(): HTMLButtonElement {
    return crearBoton({
        texto: "Enviar",
        clase: "boton-enviar",
        desactivado: true
    });
}