import {
    createDivButton,
    createSpanButton,
    createImageButton,
    createParagraphButton,
    createLinkButton,
    createArticleButton,
    createHeaderButton,
    createListButton,
    createSectionButton
} from "../buttons.ts"

const style: HTMLStyleElement = document.createElement("style")

style.textContent = `
body {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #eef5e9;
    color: #2e4a2c;
  }

  h1 {
    color: #3f6b3f;
  }

  #app {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }

  .fake-button {
    cursor: pointer;
    padding: 10px 15px;
    border: 1px solid #4f7f4f;
    border-radius: 6px;
    background: #b7d7a8;
    color: #1f3b1f;
    width: fit-content;
    transition: 0.2s;
    text-decoration: none;
    display: inline-block;
  }

  img.fake-button {
    width: 160px;
    height: auto;
  }

  .fake-button:hover {
    background: #93c47d;
  }

  .fake-button:active {
    transform: scale(0.95);
  }
`

document.head.appendChild(style)

const app: HTMLElement | null = document.getElementById("app")

if (app) {
    app.appendChild(createDivButton("Botón con DIV"))
    app.appendChild(createSpanButton("Botón con SPAN"))
    app.appendChild(createImageButton("Botón con IMAGEN"))
    app.appendChild(createParagraphButton("Botón con PÁRRAFO"))
    app.appendChild(createLinkButton("Botón con ENLACE"))
    app.appendChild(createArticleButton("Botón con ARTICLE"))
    app.appendChild(createHeaderButton("Botón con ENCABEZADO"))
    app.appendChild(createListButton("Botón con LISTA"))
    app.appendChild(createSectionButton("Botón con SECCIÓN"))
}