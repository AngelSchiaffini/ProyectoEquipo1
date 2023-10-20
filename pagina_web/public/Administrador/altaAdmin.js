document.addEventListener('DOMContentLoaded', () => {
  const altaAdminForm = document.getElementById('altaAdminForm');
  const mensajeDiv = document.getElementById('mensaje');

  altaAdminForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const Nombre = document.getElementById('Nombre').value;
    const Apellido1 = document.getElementById('Apellido1').value;
    const Apellido2 = document.getElementById('Apellido2').value;
    const ContrasenaAdmin = document.getElementById('ContrasenaAdmin').value;

    try {
      const response = await fetch('http://34.197.187.131:8080/altaAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre: Nombre,
          Apellido1: Apellido1,
          Apellido2: Apellido2,
          ContrasenaAdmin: ContrasenaAdmin,
        }),
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
