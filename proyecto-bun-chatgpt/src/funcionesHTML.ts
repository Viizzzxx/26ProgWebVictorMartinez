export function crearElemento<K extends keyof HTMLElementTagNameMap>(
    etiqueta: K,
    clase?: string,
    texto?: string
): HTMLElementTagNameMap[K] {
    const elemento: HTMLElementTagNameMap[K] = document.createElement(etiqueta);

    if (clase !== undefined) {
        elemento.className = clase;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

export function crearDiv(clase: string): HTMLDivElement {
    return crearElemento("div", clase);
}

export function crearMain(clase: string): HTMLElement {
    return crearElemento("main", clase);
}

export function crearLista(clase: string): HTMLUListElement {
    return crearElemento("ul", clase);
}

export function crearItemLista(clase: string): HTMLLIElement {
    return crearElemento("li", clase);
}

export function crearParrafo(texto: string, clase?: string): HTMLParagraphElement {
    return crearElemento("p", clase, texto);
}

export function crearSpan(texto: string): HTMLSpanElement {
    return crearElemento("span", undefined, texto);
}

export function crearFormulario(clase: string): HTMLFormElement {
    return crearElemento("form", clase);
}

export function crearInputTexto(
    placeholder: string,
    clase: string
): HTMLInputElement {
    const input: HTMLInputElement = crearElemento("input", clase);

    input.type = "text";
    input.placeholder = placeholder;

    return input;
}

export function crearTextoPequeno(
    texto: string,
    clase: string
): HTMLElement {
    return crearElemento("small", clase, texto);
}

export function crearIconoCarga(): HTMLElement {
    return crearElemento("i", "icono-carga");
}

export function crearTituloCarga(texto: string): HTMLHeadingElement {
    return crearElemento("h4", "titulo-carga", texto);
}

export function crearSubtituloCarga(texto: string): HTMLHeadingElement {
    return crearElemento("h5", "texto-carga", texto);
}