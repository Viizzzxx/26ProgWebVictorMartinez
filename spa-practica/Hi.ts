function createButtonEvP(
    text: string,
    id: string,
    css_class: string,
    evt: { event: string; handler: () => void }
): HTMLButtonElement {
    const buttonHi = document.createElement("button")

    buttonHi.textContent = text
    buttonHi.id = id
    buttonHi.classList.add(css_class)

    buttonHi.addEventListener(evt.event, evt.handler)

    return buttonHi
}

function createInjectorButton(text: string, html: string): HTMLButtonElement {
    const button = document.createElement("button")

    button.textContent = text
    button.classList.add("btn")

    button.addEventListener("click", () => {
        const appDiv = document.getElementById("App")

        if (appDiv) {
            appDiv.innerHTML = html
        }
    })

    document.body.appendChild(button)

    return button
}

function createInjectorButtonComponent(
    text: string,
    b: HTMLButtonElement
): HTMLButtonElement {
    const button = document.createElement("button")

    button.textContent = text
    button.classList.add("btn")

    button.addEventListener("click", () => {
        const appDiv = document.getElementById("App")

        if (appDiv) {
            appDiv.innerHTML = ""
            appDiv.appendChild(b)
        }
    })

    document.body.appendChild(button)

    return button
}

let button3 = createButtonEvP("console", "03", "btn", {
    event: "click",
    handler: () => {
        console.log("evento ejecutado")
    }
})

document.body.appendChild(button3)

createInjectorButton(
    "Inyectar HTML",
    "<p style='background-color: yellow; padding: 20px;'>HTML inyectado</p>"
)

createInjectorButton(
    "Página Azul",
    "<p style='background-color: blue; color: white; padding: 20px;'>Contenido Azul</p>"
)

createInjectorButton(
    "Página Roja",
    "<div style='background-color: red; color: white; padding: 20px;'>Contenido Rojo</div>"
)

let button1 = createButtonEvP("Botón 1 final", "01", "btn", {
    event: "click",
    handler: () => {
        console.log("botón final ejecutado")
    }
})

let button2 = createInjectorButtonComponent(
    "Botón 2: insertar botón 1",
    button1
)

createInjectorButtonComponent(
    "Botón 3: insertar botón 2",
    button2
)

function routerSimple(text: string, html: string): HTMLButtonElement {
    const button = document.createElement("button")

    button.textContent = text
    button.classList.add("btn")

    button.addEventListener("click", () => {
        const appDiv = document.getElementById("App")

        if (appDiv) {
            appDiv.innerHTML = html
        }
    })

    document.body.appendChild(button)

    return button
}

routerSimple(
    "Home",
    "<h2>Home</h2><p>Bienvenido a la página principal.</p>"
)

routerSimple(
    "About",
    "<h2>About</h2><p>Esta sección contiene información sobre la SPA.</p>"
)

routerSimple(
    "Contact",
    "<h2>Contact</h2><p>Correo de contacto: alumno@ejemplo.com</p>"
)