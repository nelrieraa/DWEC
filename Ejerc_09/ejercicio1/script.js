const pages = {
  inicio: '<h1>Página de Inicio</h1><p>Bienvenido a nuestra web.</p>',
  productos: '<h1>Productos</h1><p>Descubre nuestra gama de productos...</p>',
  contacto: '<h1>Contacto</h1><p>Contacta con nosotros...</p>'
};

const content = document.getElementById('content');
const links = document.querySelectorAll('nav a');


function loadPage(path) {
 
  let pageKey = path.replace('/', '');


  if (pageKey === '' || pageKey === 'index.html') pageKey = 'inicio';

 
  content.innerHTML = pages[pageKey] || '<h1>404</h1><p>Página no encontrada.</p>';


  updateActiveLink(pageKey);
}


function updateActiveLink(key) {
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '/' + key));
}


links.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const path = a.getAttribute('href');


    history.pushState({ page: path }, '', path);

    
    loadPage(path);
  });
});

window.addEventListener('popstate', (e) => {
  if (e.state) {
    loadPage(e.state.page);
  }
});


window.addEventListener('DOMContentLoaded', () => {
 
  const file = window.location.pathname.split('/').pop();
  const path = file ? '/' + file : '/inicio';


  history.replaceState({ page: path }, '', path);
  loadPage(path);
});
