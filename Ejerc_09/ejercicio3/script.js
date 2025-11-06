const progress = document.getElementById('progress');
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = (scrollTop / height) * 100;
  progress.style.width = percent + '%';

  if (scrollTop > window.innerHeight) {
    toTop.classList.add('show');
  } else {
    toTop.classList.remove('show');
  }
});

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
