document.addEventListener('DOMContentLoaded', () => {
  const altaComedorForm = document.getElementById('altaComedorForm');

  altaComedorForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const folioComedor = document.getElementById('folioComedor').value;
    const nombre = document.getElementById('nombre').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const apertura = document.getElementById('apertura').value;
    const usuario = document.getElementById('usuario').value;
    const contraComedor = document.getElementById('contraComedor').value;
    const estado = 200;

    const data = {
      FolioComedor: folioComedor,
      Nombre: nombre,
      Ubicacion: ubicacion,
      Apertura: apertura,
      Usuario: usuario,
      ContraComedor: contraComedor,
      Estado: estado,
    };

    // Realiza la solicitud al servidor para agregar el comedor
    fetch('/api/altaComedor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Manejar respuesta exitosa, por ejemplo, mostrar un mensaje
          alert('Comedor agregado con éxito.');
          altaComedorForm.reset();
        } else {
          // Manejar respuesta de error, por ejemplo, mostrar un mensaje de error
          alert('Error al agregar el comedor. Por favor, inténtelo de nuevo.');
        }
      })
      .catch((error) => {
        console.error('Error de red:', error);
        alert('Error al enviar la solicitud. Por favor, inténtelo de nuevo más tarde.');
      });
  });
});
