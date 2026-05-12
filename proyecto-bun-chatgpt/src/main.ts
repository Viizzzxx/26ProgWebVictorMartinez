import { CreateWebWorkerMLCEngine } from "@mlc-ai/web-llm";

import {
    crearDiv,
    crearFormulario,
    crearIconoCarga,
    crearInputTexto,
    crearItemLista,
    crearLista,
    crearMain,
    crearParrafo,
    crearSpan,
    crearSubtituloCarga,
    crearTextoPequeno,
    crearTituloCarga
} from "./funcionesHTML";

import { crearBotonEnviar } from "./botones";

import type { DatosInterfaz, MensajeChat, TipoMensaje } from "./tipos";

const MODELO: string = "Llama-3-8B-Instruct-q4f32_1-MLC-1k";

const mensajes: MensajeChat[] = [];

let modeloCargado: boolean = false;

function obtenerContenedorPrincipal(): HTMLDivElement {
    const app: HTMLDivElement | null = document.querySelector<HTMLDivElement>("#app");

    if (app === null) {
        throw new Error("No se encontro el contenedor principal");
    }

    return app;
}

function crearCarga(): HTMLLIElement {
    const item: HTMLLIElement = crearItemLista("cargando");
    const contenido: HTMLDivElement = crearDiv("cargando-contenido");

    const icono: HTMLElement = crearIconoCarga();
    const titulo: HTMLHeadingElement = crearTituloCarga("Cargando modelo...");
    const texto: HTMLHeadingElement = crearSubtituloCarga("Puede tardar un poco la primera vez");

    contenido.append(icono, titulo, texto);
    item.appendChild(contenido);

    return item;
}

function crearInterfaz(): DatosInterfaz {
    const contenedor: HTMLDivElement = crearDiv("contenedor");

    const chat: HTMLElement = crearMain("chat");

    const listaMensajes: HTMLUListElement = crearLista("lista-mensajes");

    const carga: HTMLLIElement = crearCarga();

    listaMensajes.appendChild(carga);
    chat.appendChild(listaMensajes);

    const formulario: HTMLFormElement = crearFormulario("formulario");

    const cajaTexto: HTMLInputElement = crearInputTexto(
        "Escribe tu mensaje aqui...",
        "caja-texto"
    );

    const botonEnviar: HTMLButtonElement = crearBotonEnviar();

    formulario.append(cajaTexto, botonEnviar);

    const textoEstado: HTMLElement = crearTextoPequeno(
        "Cargando...",
        "estado"
    );

    contenedor.append(chat, formulario, textoEstado);

    return {
        contenedor,
        chat,
        listaMensajes,
        formulario,
        cajaTexto,
        botonEnviar,
        textoEstado,
        carga
    };
}

function agregarMensaje(
    listaMensajes: HTMLUListElement,
    chat: HTMLElement,
    texto: string,
    tipo: TipoMensaje
): HTMLParagraphElement {
    const item: HTMLLIElement = crearItemLista(`mensaje ${tipo}`);

    const nombre: string = tipo === "bot" ? "GPT" : "Tú";

    const avatar: HTMLSpanElement = crearSpan(nombre);
    const parrafo: HTMLParagraphElement = crearParrafo(texto);

    item.append(avatar, parrafo);

    listaMensajes.appendChild(item);

    chat.scrollTop = chat.scrollHeight;

    return parrafo;
}

async function iniciarChat(interfaz: DatosInterfaz): Promise<void> {
    const worker: Worker = new Worker("./dist/worker.js", {
        type: "module"
    });

    const motor = await CreateWebWorkerMLCEngine(
        worker,
        MODELO,
        {
            initProgressCallback: (info): void => {
                interfaz.textoEstado.textContent = info.text;

                if (info.progress === 1 && modeloCargado === false) {
                    modeloCargado = true;

                    interfaz.carga.remove();
                    interfaz.botonEnviar.disabled = false;

                    agregarMensaje(
                        interfaz.listaMensajes,
                        interfaz.chat,
                        "Hola, soy un chat que se ejecuta en el navegador. ¿En que puedo ayudarte?",
                        "bot"
                    );

                    interfaz.cajaTexto.focus();
                }
            }
        }
    );

    interfaz.formulario.addEventListener("submit", async (evento: SubmitEvent): Promise<void> => {
        evento.preventDefault();

        const textoUsuario: string = interfaz.cajaTexto.value.trim();

        if (textoUsuario === "") {
            return;
        }

        interfaz.cajaTexto.value = "";
        interfaz.botonEnviar.disabled = true;

        agregarMensaje(
            interfaz.listaMensajes,
            interfaz.chat,
            textoUsuario,
            "usuario"
        );

        mensajes.push({
            role: "user",
            content: textoUsuario
        });

        const respuestaBot: HTMLParagraphElement = agregarMensaje(
            interfaz.listaMensajes,
            interfaz.chat,
            "",
            "bot"
        );

        const partesRespuesta = await motor.chat.completions.create({
            messages: mensajes,
            stream: true
        });

        let textoRespuesta: string = "";

        for await (const parte of partesRespuesta) {
            const contenido: string = parte.choices[0]?.delta?.content ?? "";

            textoRespuesta += contenido;
            respuestaBot.textContent = textoRespuesta;

            interfaz.chat.scrollTop = interfaz.chat.scrollHeight;
        }

        mensajes.push({
            role: "assistant",
            content: textoRespuesta
        });

        interfaz.botonEnviar.disabled = false;
        interfaz.cajaTexto.focus();
    });
}

const raiz: HTMLDivElement = obtenerContenedorPrincipal();

const interfaz: DatosInterfaz = crearInterfaz();

raiz.appendChild(interfaz.contenedor);

await iniciarChat(interfaz);