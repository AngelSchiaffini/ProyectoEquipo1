// Recupera el valor de IDUsuario desde el LocalStorage
const IDUsuario = localStorage.getItem('IDUsuario');

// Utiliza IDUsuario como sea necesario en esta página
console.log(IDUsuario);

const contenedorQR = document.getElementById('contenedorQR');
const formulario = document.getElementById('formulario');
const QR = new QRCode(contenedorQR);

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  QR.makeCode(IDUsuario);
});

// ...

document.addEventListener('DOMContentLoaded', () => {
  const familiaresTable = document.getElementById('familiaresTable').getElementsByTagName('tbody')[0];
  const agregarParienteButton = document.querySelector('.agregarParienteButton');
  
  agregarParienteButton.addEventListener('click', (e) => { 
    e.preventDefault();
    const IDnuevoPInput = document.getElementById('IDnuevoP'); // Obtener referencia al campo de entrada
    const IDnuevoP = IDnuevoPInput.value; // Obtener el valor del campo de entrada

    // Llama a la función handleAddClick con los valores IDUsuario e IDnuevoP
    handleAddClick(IDUsuario, IDnuevoP);
  });

  fetch(`/buscarFamiliares/${IDUsuario}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Error al obtener los familiares');
      }
    })
    .then((familiares) => {
      familiares.forEach((familiar) => {
        const row = familiaresTable.insertRow();
        row.insertCell(0).textContent = familiar.IDUsuario;
        row.insertCell(1).textContent = familiar.Nombre;
        row.insertCell(2).textContent = familiar.Apellido1;
        row.insertCell(3).textContent = familiar.Apellido2;

        const cell = row.insertCell(4);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.className = 'delete-button';

        deleteButton.addEventListener('click', () => {
          const pariente2 = familiar.IDUsuario;
          handleDeleteClick(IDUsuario, pariente2);
        });

        cell.appendChild(deleteButton);
      });
    })
    .catch((error) => {
      console.error(error);
      alert('Error al obtener los familiares.');
    });
    
  
});

function handleDeleteClick(Pariente1, Pariente2) {
  if (confirm('¿Estás seguro de que deseas borrar este pariente?')) {
    fetch('/bajaPariente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Pariente1,
        Pariente2,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert('Pariente dado de baja con éxito');
          window.location.reload();
        } else {
          alert('Error al dar de baja al pariente');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error al borrar el pariente.');
      });
  }
}

// Obtén una referencia al botón en tu página HTML
// JavaScript
function handleAddClick(Pariente1, Pariente2){
  fetch('/altaPariente',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Pariente1,
      Pariente2,
    }),
  })
    .then((response) =>{
      if(response.status === 200){
        alert('Pariente dado de alta con éxito');
        window.location.reload();
      } else {
        alert('Error al dar de alta al pariente');
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Error al agregar el pariente.');
    });
}
