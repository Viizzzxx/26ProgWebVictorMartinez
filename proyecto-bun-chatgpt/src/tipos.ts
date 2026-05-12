export type TipoMensaje = "usuario" | "bot";

export type RolMensaje = "user" | "assistant";

export interface MensajeChat {
    role: RolMensaje;
    content: string;
}

export interface DatosInterfaz {
    contenedor: HTMLDivElement;
    chat: HTMLElement;
    listaMensajes: HTMLUListElement;
    formulario: HTMLFormElement;
    cajaTexto: HTMLInputElement;
    botonEnviar: HTMLButtonElement;
    textoEstado: HTMLElement;
    carga: HTMLLIElement;
}