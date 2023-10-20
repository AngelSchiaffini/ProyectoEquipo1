// registro.js

// Agrega un evento de escucha al formulario para manejar la presentación del formulario
const registroForm = document.getElementById('registroForm');
registroForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitar la recarga de la página

  // Obtener los valores del formulario
  const Nombre = document.getElementById('nombre').value;
  const Apellido1 = document.getElementById('Apellido1').value;
  const Apellido2 = document.getElementById('Apellido2').value;
  const CURP = document.getElementById('Curp').value;
  const Nacionalidad = document.getElementById('Nacionalidad').value;
  const Sexo = document.getElementById('genero').value;
  const FechaNac = document.getElementById('fechaNacimiento').value;
  const Condicion = document.getElementById('condicion').value;
  const Cel = document.getElementById('celular').value;
  const Correo = document.getElementById('correo').value;

  // Realizar una solicitud POST al servidor
  try {
    const response = await fetch('/altaUsuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nombre,
        Apellido1,
        Apellido2,
        CURP,
        Nacionalidad,
        Sexo,
        FechaNac,
        Condicion,
        Cel,
        Correo,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.mensaje);
      window.location.href = '/InicioSesion/index.html';
      // Restablece el formulario o redirige a otra página si es necesario
    } else {
      alert('Error');
    }
  } catch (error) {
    console.error(error);
    alert('Error');
  }
});
