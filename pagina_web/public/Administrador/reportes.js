document.addEventListener('DOMContentLoaded', () => {
  const reportesList = document.getElementById('reportes-list');

  // Realizar una solicitud GET a la API
  fetch('/api/reportes')
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Error al obtener los datos de la API');
      }
    })
    .then((data) => {
      // Procesar los datos y mostrarlos en la página
      data.forEach((reporte) => {
        const listItem = document.createElement('li');
        listItem.textContent = `FolioReporte: ${reporte.FolioReporte}, Descripcion: ${reporte.Descripcion}`;
        reportesList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error(error);
      reportesList.textContent = 'Error al obtener los datos.';
    });
});
