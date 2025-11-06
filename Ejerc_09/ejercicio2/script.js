const spans = {
  viewport: document.getElementById('viewport'),
  outer: document.getElementById('outer'),
  position: document.getElementById('position'),
  screen: document.getElementById('screen'),
  avail: document.getElementById('avail'),
  connection: document.getElementById('connection')
};
const indicator = document.getElementById('indicator');

function updateInfo() {
  spans.viewport.textContent = `${window.innerWidth} x ${window.innerHeight}`;
  spans.outer.textContent = `${window.outerWidth} x ${window.outerHeight}`;
  spans.screen.textContent = `${screen.width} x ${screen.height}`;
  spans.avail.textContent = `${screen.availWidth} x ${screen.availHeight}`;
  spans.connection.textContent = navigator.onLine ? 'Online' : 'Offline';
  indicator.className = navigator.onLine ? 'online' : 'offline';
}

let lastPos = { x: window.screenX, y: window.screenY };
function checkPosition() {
  if (window.screenX !== lastPos.x || window.screenY !== lastPos.y) {
    lastPos = { x: window.screenX, y: window.screenY };
    spans.position.textContent = `${lastPos.x}, ${lastPos.y}`;
  }
}

window.addEventListener('resize', updateInfo);
window.addEventListener('online', updateInfo);
window.addEventListener('offline', updateInfo);

setInterval(checkPosition, 250);
window.addEventListener('DOMContentLoaded', () => {
  updateInfo();
  spans.position.textContent = `${window.screenX}, ${window.screenY}`;
});
