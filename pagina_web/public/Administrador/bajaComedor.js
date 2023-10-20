document.addEventListener('DOMContentLoaded', () => {
  const bajaComedorBtn = document.getElementById('bajaComedor');
  const mensajeDiv = document.getElementById('mensaje');
  const folioComedorInput = document.getElementById('FolioComedor');

  bajaComedorBtn.addEventListener('click', async () => {
    const folioComedor = folioComedorInput.value;

    if (!folioComedor) {
      mensajeDiv.innerText = 'Por favor, ingrese el Folio del Comedor.';
      return;
    }

    try {
      const response = await fetch('http://34.197.187.131:8080/bajaComedor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ FolioComedor: folioComedor }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.mensaje);
        window.location.href = '/Administrador/moduloadmin.html';
      } else {
        mensajeDiv.innerText = data.error;
      }
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      mensajeDiv.innerText = 'Error en la comunicación con la API.';
    }
  });
});
