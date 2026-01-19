const API_URL = 'https://crudcrud.com/api/06458db5ab5c42ecb293fe8d2fd04b61/users';

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


function uploadInitialUsers(users) {
   users.forEach(usuario => {
        fetch(API_URL,{
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(usuario)
    }).then(response => response.json()).then(data => console.log('Usuario subido :',data)).catch(error => console.error('Error :',error));

   });
}


function displayUsers() {
    const body = document.getElementById('user-table-body');
    body.innerHTML = '';
    fetch(API_URL)
    .then(response=>response.json())
    .then(data=>{
        data.forEach(usuario =>{
            const fila = `
            <tr>
                <td><img src="${usuario.picture}" class="avatar-img"></td>
                <td>${usuario.firstName} ${usuario.lastName}</td>
                <td>${usuario.email}</td>
                <td>
                    <button class="secondary" onclick="prepareEdit('${usuario._id}')">Editar</button>
                    <button class="danger" onclick="deleteUser('${usuario._id}')">Eliminar</button>
                </td>
            </tr>
            `;
            body.innerHTML+=fila;
        });
    })
    .catch(error => console.error('Error :', error));
}


document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const usuarios = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        picture: document.getElementById('picture').value
        
};
const id = document.getElementById('user-id').value;
if(id === ""){
    fetch(API_URL,{
        method : 'POST',
        body: JSON.stringify(usuarios),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(()=>{
        e.target.reset();
        document.getElementById('user-id').value = '';
        displayUsers();
    });
}else{
    fetch(`${API_URL}/${id}`,{
        method : 'PUT',
        body: JSON.stringify(usuarios),
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>response.json()).then(() =>{
        e.target.reset();
        document.getElementById('user-id').value = '';
        displayUsers();
    });
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
function deleteUser(id) {
    if(confirm('¿Estás seguro de eliminar este usuario?')){
        fetch(`${API_URL}/${id}`,{
            method : 'DELETE'
        })
        .then(() => displayUsers()) 
        .catch(error => console.error('Error al borrar:', error));
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
    });