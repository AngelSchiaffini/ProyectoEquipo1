function U_InicioSesion() {
  event.preventDefault();
  console.log('Función U_InicioSesion activada');

  const inputValue = document.getElementById('IDingresado').value;

  const isIDUsuario = /^\d{4}$/.test(inputValue); // Comprobar si es un IDUsuario de 4 dígitos
  const isCURP = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$/.test(inputValue);
  const isCelular = /^\d{10}$/.test(inputValue);
  const isCorreo = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputValue);

  // Guarda el valor original en localStorage
  

  if (isIDUsuario) {
    // Si es un IDUsuario de 4 dígitos, llama a la API correspondiente
    fetch(`/inicioSesion/${inputValue}`)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('IDUsuario', inputValue);
          // Usuario encontrado, redirige a la página de datos del usuario
          window.location.href = '/InicioSesion/datosUsuario.html';
        } else {
          // Usuario no encontrado o error
          alert('Usuario no encontrado o se produjo un error.');
        }
      })
      .catch((error) => {
        console.error('Error de red:', error);
      });
  } else if (isCURP) {
    // Si es CURP, llama a la API correspondiente
    fetch(`/obtenerIDcCu/${inputValue}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json(); // Convierte la respuesta a JSON
    } else {
      throw new Error('Usuario no encontrado o se produjo un error en la segunda API.');
    }
  })
  .then((data) => {
    if (data && data.length > 0) {
      const idUsuario = data[0].IDUsuario;
      localStorage.setItem('IDUsuario', idUsuario);
      // Usuario encontrado, redirige a la página de datos del usuario
      window.location.href = '/InicioSesion/datosUsuario.html';
    } else {
      // No se encontró el usuario
      alert('Usuario no encontrado.');
    }
  })
  .catch((error) => {
    console.error('Error de red:', error);
    alert('Ocurrió un error en la solicitud de la segunda API.');
  });

  } else if (isCelular) {
    // Si es celular, llama a la API correspondiente
    fetch(`/obtenerIDcCe/${inputValue}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json(); // Convierte la respuesta a JSON
    } else {
      throw new Error('Usuario no encontrado o se produjo un error en la segunda API.');
    }
  })
  .then((data) => {
    if (data && data.length > 0) {
      const idUsuario = data[0].IDUsuario;
      localStorage.setItem('IDUsuario', idUsuario);
      // Usuario encontrado, redirige a la página de datos del usuario
      window.location.href = '/InicioSesion/datosUsuario.html';
    } else {
      // No se encontró el usuario
      alert('Usuario no encontrado.');
    }
  })
  .catch((error) => {
    console.error('Error de red:', error);
    alert('Ocurrió un error en la solicitud de la segunda API.');
  });
  } else if (isCorreo) {
    // Si es correo, llama a la API correspondiente
    fetch(`/obtenerIDcCo/${inputValue}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json(); // Convierte la respuesta a JSON
    } else {
      throw new Error('Usuario no encontrado o se produjo un error en la segunda API.');
    }
  })
  .then((data) => {
    if (data && data.length > 0) {
      const idUsuario = data[0].IDUsuario;
      localStorage.setItem('IDUsuario', idUsuario);
      // Usuario encontrado, redirige a la página de datos del usuario
      window.location.href = '/InicioSesion/datosUsuario.html';
    } else {
      // No se encontró el usuario
      alert('Usuario no encontrado.');
    }
  })
  .catch((error) => {
    console.error('Error de red:', error);
    alert('Ocurrió un error en la solicitud de la segunda API.');
  });
  } else {
    // Si no coincide con ninguno, muestra un mensaje de error
    alert('Valor no válido. Debe ser un CURP, celular, correo o IDUsuario de 4 dígitos registrado.');
  }
}

