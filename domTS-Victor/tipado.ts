import { JSDOM } from "jsdom"

const html: string = await Bun.file("tipado.html").text()
const dom: JSDOM = new JSDOM(html)
const document: Document = dom.window.document

console.log(document.body.innerHTML === "" ? "Empty HTML found" : "HTML found")

document.body.innerHTML = ""

// Título
const title: HTMLHeadingElement = document.createElement("h1")
title.textContent = "Practica DOM con Bun y TypeScript"
document.body.appendChild(title)

// textarea con rows, cols y placeholder
const textarea: HTMLTextAreaElement = document.createElement("textarea")
textarea.rows = 4
textarea.cols = 40
textarea.placeholder = "Escribe aquí"
document.body.appendChild(textarea)

// tabla para usar tr, th y td
const table: HTMLTableElement = document.createElement("table")
table.border = "1"

// tr con class
const headerRow: HTMLTableRowElement = document.createElement("tr")
headerRow.classList.add("row")

// th con scope
const headerName: HTMLTableCellElement = document.createElement("th")
headerName.scope = "col"
headerName.textContent = "Nombre"

// th con scope
const headerDescription: HTMLTableCellElement = document.createElement("th")
headerDescription.scope = "col"
headerDescription.textContent = "Descripción"

headerRow.appendChild(headerName)
headerRow.appendChild(headerDescription)
table.appendChild(headerRow)

// tr con class
const dataRow: HTMLTableRowElement = document.createElement("tr")
dataRow.classList.add("row")

// td con colspan
const dataCell: HTMLTableCellElement = document.createElement("td")
dataCell.colSpan = 2
dataCell.textContent = "Celda creada con colspan desde TypeScript"

dataRow.appendChild(dataCell)
table.appendChild(dataRow)

document.body.appendChild(table)

// footer con class
const footer: HTMLElement = document.createElement("footer")
footer.classList.add("pageFooter")
footer.textContent = "Pie de página creado con TypeScript"
document.body.appendChild(footer)

// Guardar el resultado en el archivo HTML
await Bun.write("tipado.html", dom.serialize())

console.log("HTML actualizado correctamente")