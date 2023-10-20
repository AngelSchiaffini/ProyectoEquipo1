document.addEventListener('DOMContentLoaded', () => {
  const eliminarAdminForm = document.getElementById('eliminarAdminForm');
  const mensajeDiv = document.getElementById('mensaje');

  eliminarAdminForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const IDAdmin = document.getElementById('IDAdmin').value;

    try {
      const response = await fetch(`http://34.197.187.131:8080/Administrador/${IDAdmin}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Administrador con ID ${IDAdmin} eliminado con éxito.`);
        window.location.href = '/Administrador/moduloadmin.html';
      } else if (response.status === 404) {
        mensajeDiv.innerText = `No se encontró un administrador con ID ${IDAdmin}.`;
      } else {
        mensajeDiv.innerText = 'Error al eliminar el administrador.';
      }
    } catch (error) {
      console.error('Error al comunicarse con la API:', error);
      mensajeDiv.innerText = 'Error en la comunicación con la API.';
    }
  });
});
