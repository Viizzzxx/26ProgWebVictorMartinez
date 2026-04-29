export function createDivButton(text: string): HTMLElement {
    const div: HTMLDivElement = document.createElement("div")

    div.textContent = text
    div.className = "fake-button"

    div.addEventListener("click", () => {
        console.log("Botón DIV presionado")
    })

    return div
}

export function createSpanButton(text: string): HTMLElement {
    const span: HTMLSpanElement = document.createElement("span")

    span.textContent = text
    span.className = "fake-button"

    span.addEventListener("click", () => {
        console.log("Botón SPAN presionado")
    })

    return span
}

export function createImageButton(text: string): HTMLElement {
    const image: HTMLImageElement = document.createElement("img")

    image.src = "assets/cocacola.png"
    image.alt = text
    image.className = "fake-button"

    image.addEventListener("click", () => {
        console.log("Botón IMAGEN presionado")
    })

    return image
}

export function createParagraphButton(text: string): HTMLElement {
    const paragraph: HTMLParagraphElement = document.createElement("p")

    paragraph.textContent = text
    paragraph.className = "fake-button"

    paragraph.addEventListener("click", () => {
        console.log("Botón PÁRRAFO presionado")
    })

    return paragraph
}

export function createLinkButton(text: string): HTMLElement {
    const link: HTMLAnchorElement = document.createElement("a")

    link.textContent = text
    link.href = "#"
    link.className = "fake-button"

    link.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault()
        console.log("Botón ENLACE presionado")
    })

    return link
}

export function createArticleButton(text: string): HTMLElement {
    const article: HTMLElement = document.createElement("article")

    article.textContent = text
    article.className = "fake-button"

    article.addEventListener("click", () => {
        console.log("Botón ARTICLE presionado")
    })

    return article
}

export function createHeaderButton(text: string): HTMLElement {
    const header: HTMLHeadingElement = document.createElement("h2")

    header.textContent = text
    header.className = "fake-button"

    header.addEventListener("click", () => {
        console.log("Botón ENCABEZADO presionado")
    })

    return header
}

export function createListButton(text: string): HTMLElement {
    const listItem: HTMLLIElement = document.createElement("li")

    listItem.textContent = text
    listItem.className = "fake-button"

    listItem.addEventListener("click", () => {
        console.log("Botón LISTA presionado")
    })

    return listItem
}

export function createSectionButton(text: string): HTMLElement {
    const section: HTMLElement = document.createElement("section")

    section.textContent = text
    section.className = "fake-button"

    section.addEventListener("click", () => {
        console.log("Botón SECCIÓN presionado")
    })

    return section
}