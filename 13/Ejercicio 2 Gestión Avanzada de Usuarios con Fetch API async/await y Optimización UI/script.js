const API_URL = 'https://crudcrud.com/api/06458db5ab5c42ecb293fe8d2fd04b61/users';

let todosLosUsuarios = [];
const initialUsers = [
{
"firstName": "Alice",
"lastName": "Smith",
"email": "alice.smith@example.com",
"picture": "https://randomuser.me/api/portraits/women/1.jpg"
},
{
"firstName": "Bob",
"lastName": "Johnson",
"email": "bob.johnson@example.com",
"picture": "https://randomuser.me/api/portraits/men/2.jpg"
},
{
"firstName": "Charlie",
"lastName": "Brown",
"email": "charlie.brown@example.com",
"picture": "https://randomuser.me/api/portraits/men/3.jpg"
},
{
"firstName": "Diana",
"lastName": "Prince",
"email": "diana.prince@example.com",
"picture": "https://randomuser.me/api/portraits/women/4.jpg"
},
{
"firstName": "Eve",
"lastName": "Adams",
"email": "eve.adams@example.com",
"picture": "https://randomuser.me/api/portraits/women/5.jpg"
},
{
"firstName": "Frank",
"lastName": "White",
"email": "frank.white@example.com",
"picture": "https://randomuser.me/api/portraits/men/6.jpg"
},
{
"firstName": "Grace",
"lastName": "Taylor",
"email": "grace.taylor@example.com",
"picture": "https://randomuser.me/api/portraits/women/7.jpg"
},
{
"firstName": "Henry",
"lastName": "Moore",
"email": "henry.moore@example.com",
"picture": "https://randomuser.me/api/portraits/men/8.jpg"
},
{
"firstName": "Ivy",
"lastName": "Clark",
"email": "ivy.clark@example.com",
"picture": "https://randomuser.me/api/portraits/women/9.jpg"
},
{
"firstName": "Jack",
"lastName": "Lewis",
"email": "jack.lewis@example.com",
"picture": "https://randomuser.me/api/portraits/men/10.jpg"
}
]


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
        const fila = `
            <tr id="fila-${usuario._id}">
                <td><img src="${usuario.picture}" class="avatar-img"></td>
                <td>${usuario.firstName} ${usuario.lastName}</td>
                <td>${usuario.email}</td>
                <td>
                    <button class="secondary" onclick="prepareEdit('${usuario._id}')">Editar</button>
                    <button class="danger" onclick="deleteUser('${usuario._id}')">Eliminar</button>
                </td>
            </tr>`;
        body.innerHTML += fila;
    })
    
}
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