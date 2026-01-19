const API_URL = 'https://crudcrud.com/api/06458db5ab5c42ecb293fe8d2fd04b61/users';

let todosLosUsuarios = [];
const initialUsers = [
    {
        "firstName": "Alice",
        "lastName": "Smith",
        "email": "alice.smith@example.com",
        "picture": "https://randomuser.me/api/portraits/women/1.jpg",
        "calificaciones": { "Matemáticas": 8.5, "Historia": 7.0, "Ciencia": 9.2, "Inglés": 6.8, "Arte": 7.5 }
    },
    {
        "firstName": "Bob",
        "lastName": "Johnson",
        "email": "bob.johnson@example.com",
        "picture": "https://randomuser.me/api/portraits/men/2.jpg",
        "calificaciones": { "Matemáticas": 6.0, "Historia": 5.5, "Ciencia": 7.0, "Inglés": 8.0, "Arte": 6.5 }
    },
    {
        "firstName": "Charlie",
        "lastName": "Brown",
        "email": "charlie.brown@example.com",
        "picture": "https://randomuser.me/api/portraits/men/3.jpg",
        "calificaciones": { "Matemáticas": 9.5, "Historia": 9.0, "Ciencia": 10.0, "Inglés": 8.5, "Arte": 9.0 }
    },
    {
        "firstName": "Diana",
        "lastName": "Prince",
        "email": "diana.prince@example.com",
        "picture": "https://randomuser.me/api/portraits/women/4.jpg",
        "calificaciones": { "Matemáticas": 7.2, "Historia": 8.4, "Ciencia": 6.5, "Inglés": 9.1, "Arte": 8.8 }
    },
    {
        "firstName": "Eve",
        "lastName": "Adams",
        "email": "eve.adams@example.com",
        "picture": "https://randomuser.me/api/portraits/women/5.jpg",
        "calificaciones": { "Matemáticas": 5.8, "Historia": 6.2, "Ciencia": 5.5, "Inglés": 7.4, "Arte": 8.0 }
    },
    {
        "firstName": "Frank",
        "lastName": "White",
        "email": "frank.white@example.com",
        "picture": "https://randomuser.me/api/portraits/men/6.jpg",
        "calificaciones": { "Matemáticas": 8.0, "Historia": 7.5, "Ciencia": 8.2, "Inglés": 6.0, "Arte": 7.0 }
    },
    {
        "firstName": "Grace",
        "lastName": "Taylor",
        "email": "grace.taylor@example.com",
        "picture": "https://randomuser.me/api/portraits/women/7.jpg",
        "calificaciones": { "Matemáticas": 9.0, "Historia": 9.5, "Ciencia": 9.8, "Inglés": 9.2, "Arte": 10.0 }
    },
    {
        "firstName": "Henry",
        "lastName": "Moore",
        "email": "henry.moore@example.com",
        "picture": "https://randomuser.me/api/portraits/men/8.jpg",
        "calificaciones": { "Matemáticas": 6.7, "Historia": 5.9, "Ciencia": 7.1, "Inglés": 6.3, "Arte": 5.5 }
    },
    {
        "firstName": "Ivy",
        "lastName": "Clark",
        "email": "ivy.clark@example.com",
        "picture": "https://randomuser.me/api/portraits/women/9.jpg",
        "calificaciones": { "Matemáticas": 7.5, "Historia": 8.0, "Ciencia": 7.8, "Inglés": 8.5, "Arte": 9.2 }
    },
    {
        "firstName": "Jack",
        "lastName": "Lewis",
        "email": "jack.lewis@example.com",
        "picture": "https://randomuser.me/api/portraits/men/10.jpg",
        "calificaciones": { "Matemáticas": 5.2, "Historia": 6.0, "Ciencia": 5.8, "Inglés": 5.5, "Arte": 6.2 }
    }
];


async function uploadInitialUsers(users) {
   for(const usuario of users){
    const response = await fetch(API_URL,{
        method : 'POST',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(usuario)        
   });
   const data = await response.json();
}}


async function displayUsers() {
    
    try{
    const response = await fetch(API_URL)
    const data = await response.json();
    todosLosUsuarios = data;
    pintarTabla(todosLosUsuarios);
    }catch(error){
        console.error('Error :', error);
    } 
}
function pintarTabla(usuariosParaDibujar){
    const body = document.getElementById('user-table-body');
    body.innerHTML = '';
    
    usuariosParaDibujar.forEach(usuario => {
        let notasHtml = '';
        if(usuario.calificaciones){
            notasHtml = `<br><small>${Object.entries(usuario.calificaciones).map(([asig ,nota])=>`${asig}:${nota}`).join(',')}</small>`;
        }
        const fila = `
            <tr id="fila-${usuario._id}">
                <td><img src="${usuario.picture}" class="avatar-img"></td>
                <td>${usuario.firstName} ${usuario.lastName}</td>
                <td>${usuario.email}</td>
                <td>${usuario.firstName} ${usuario.lastName} ${notasHtml}</td>
                <td>
                    <button class="secondary" onclick="prepareEdit('${usuario._id}')">Editar</button>
                    <button class="danger" onclick="deleteUser('${usuario._id}')">Eliminar</button>
                    <button class = "info" onclick ="abrirModal('${usuario._id}')">Notas </button>
                </td>
            </tr>`;
        body.innerHTML += fila;
    })
    
}
function abrirModal(id){
    const usuario = todosLosUsuarios.find(u=>u._id === id);
    if(!usuario)return;
    document.getElementById('grade-user-id').value = id;
    document.getElementById('modal-user-name').querySelector('span').innerText = `${usuario.firstName} ${usuario.lastName}`;
    const calif = usuario.calificaciones || {};
    document.getElementById('grade-math').value = calif["Matemáticas"] || 0;
    document.getElementById('grade-hist').value = calif["Historia"] || 0;
    document.getElementById('grade-sci').value = calif["Ciencia"] || 0;
    document.getElementById('grade-eng').value = calif["Inglés"] || 0;
    document.getElementById('grade-art').value = calif["Arte"] || 0;

    document.getElementById('modal-calificaciones').classList.remove('hidden');
}
const formCalificaciones = document.getElementById('form-calificaciones');
formCalificaciones.addEventListener('submit',async function(e) {
    e.preventDefault();
    const id = document.getElementById('grade-user-id').value;
    const usuarioOriginal = todosLosUsuarios.find(u => u._id === id);
    const usuarioActualizado = {
        firstName: usuarioOriginal.firstName,
        lastName: usuarioOriginal.lastName,
        email: usuarioOriginal.email,
        picture: usuarioOriginal.picture,
        calificaciones: {
            "Matemáticas": parseFloat(document.getElementById('grade-math').value),
            "Historia": parseFloat(document.getElementById('grade-hist').value),
            "Ciencia": parseFloat(document.getElementById('grade-sci').value),
            "Inglés": parseFloat(document.getElementById('grade-eng').value),
            "Arte": parseFloat(document.getElementById('grade-art').value)
        }
    };

    try {
        
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(usuarioActualizado),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            cerrarModal(); 
            displayUsers(); 
        }
    } catch (error) {
        console.error("Error al guardar notas:", error);
    }
    
});
const borrarCalificaciones = document.getElementById('btn-delete-grades');
borrarCalificaciones.addEventListener('click',async function() {
    if(!confirm('¿Seguro que quieres borrar todas las notas de este usuario?'))return;
    const id = document.getElementById('grade-user-id').value;
    const usuarioOriginal = todosLosUsuarios.find(u => u._id === id);


    const usuarioSinNotas = {
        firstName: usuarioOriginal.firstName,
        lastName: usuarioOriginal.lastName,
        email: usuarioOriginal.email,
        picture: usuarioOriginal.picture
        
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(usuarioSinNotas),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            cerrarModal();
            displayUsers();
        }
    } catch (error) {
        console.error("Error al borrar notas:", error);
    }
})
const input = document.getElementById('input-busqueda');
    input.addEventListener('input',function(){
        const textoABuscar = input.value.toLowerCase();
        const listaFiltrada = todosLosUsuarios.filter(u => u.firstName.toLowerCase().includes(textoABuscar));
        pintarTabla(listaFiltrada);
    });


document.getElementById('user-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const usuarios = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        picture: document.getElementById('picture').value
        
};
if(usuarios.firstName.trim()=== ''){
   return alert('el nombre no puede estar vacio!!');
   
}
const boton = document.getElementById('btn-save');
try{
    boton.disabled = true;
    boton.innerText = 'Guardando...';
    const id = document.getElementById('user-id').value;
    if(id === ""){
    const response = await fetch(API_URL,{
        method : 'POST',
        body: JSON.stringify(usuarios),
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json();
        e.target.reset();
        document.getElementById('user-id').value = '';
        displayUsers();
    }
    else{
    const response = await fetch(`${API_URL}/${id}`,{
        method : 'PUT',
        body: JSON.stringify(usuarios),
        headers: { 'Content-Type': 'application/json' }
    })
    if(response.ok){
        e.target.reset();
        document.getElementById('user-id').value = '';
        displayUsers(); 
    }
        
    }
    
    }catch(error){
        console.error('Error : ' + error );


    }finally{
        boton.disabled = false;
    }


});

function prepareEdit(id){
    fetch(`${API_URL}/${id}`).then(response => response.json()).then(usuario =>{
        document.getElementById('user-id').value = usuario._id;
        document.getElementById('firstName').value = usuario.firstName;
        document.getElementById('lastName').value = usuario.lastName;
        document.getElementById('email').value = usuario.email;
        document.getElementById('picture').value = usuario.picture;
    })
}
async function deleteUser(id) {
    
    if(confirm('¿Estás seguro de eliminar este usuario?')){
        const fila = document.getElementById('fila-'+id);
        if(fila) fila.remove();
        try{
            const response = await fetch(`${API_URL}/${id}`,{
            method : 'DELETE'
        })
        if(!response.ok) throw new Errror('no se pudo borrar en el server');


        }catch(error){
            alert('error al borrar el usuario');
            displayUsers();
            console.error(error);
        }
    }
}
function cerrarModal() {
    document.getElementById('modal-calificaciones').classList.add('hidden');
}

const botonCerrar = document.getElementById('btn-close-modal');
botonCerrar.addEventListener('click', cerrarModal);


fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        if (data.length === 0) {
            
            uploadInitialUsers(initialUsers);
           
            setTimeout(displayUsers, 2000); 
        } else {
            
            displayUsers();
        }
    })