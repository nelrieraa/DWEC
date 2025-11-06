let popupWindow = null;

function openPopup() {
  const width = 400;
  const height = 300;
  const left = (window.screen.width - width) / 2;
  const top = 50;

  if (!popupWindow || popupWindow.closed) {
    popupWindow = window.open('popup.html', 'popup', `width=${width},height=${height},left=${left},top=${top}`);
  } else {
    popupWindow.focus();
  }
}

document.getElementById('openManual').addEventListener('click', openPopup);

document.getElementById('closePopup').addEventListener('click', () => {
  if (popupWindow && !popupWindow.closed) {
    popupWindow.close();
  }
});

window.addEventListener('load', () => {
  setTimeout(openPopup, 5000);
});
