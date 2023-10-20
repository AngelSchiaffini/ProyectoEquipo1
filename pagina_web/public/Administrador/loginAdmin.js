document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const mensaje = document.getElementById('mensaje');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const IDAdmin = document.getElementById('IDAdmin').value;
        const Contrasena = document.getElementById('Contrasena').value;

        try {
            const response = await fetch('/loginAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ IDAdmin, Contrasena }),
            });

            if (response.status === 200) {
                // Autenticación exitosa, redirigir a moduloadmin.html
                window.location.href = 'moduloadmin.html';
            } else {
                // Autenticación fallida, mostrar un mensaje de error
                const data = await response.json();
                mensaje.textContent = data.error;
            }
        } catch (error) {
            console.error('Error en la comunicación con el servidor:', error);
            mensaje.textContent = 'Error en la comunicación con el servidor';
        }
    });
});
