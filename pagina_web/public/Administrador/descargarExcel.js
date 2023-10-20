// script.js
// URL del archivo CSV publicado en Google Sheets
var csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRzvbGkCiX38WEAk3lkhsYnKWDAxzep8O70oSXMeTYcOwzoH9qohrjiJ74_5ENmbIin9X8-IITCGloY/pub?gid=723548145&single=true&output=csv";

// Función para abrir una nueva ventana y descargar el archivo
function downloadCSV() {
    window.open(csvURL, "_blank");
}

// Agregar un controlador de eventos al botón
document.getElementById("downloadButton").addEventListener("click", downloadCSV);
