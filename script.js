// Bloc de notas con guardado automático
const notes = document.getElementById('notes');
notes.value = localStorage.getItem('ghibli_notes') || '';

notes.addEventListener('input', () => {
  localStorage.setItem('ghibli_notes', notes.value);
});

// Selector de fondo
const thumbs = document.querySelectorAll('.bg-thumb');
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const bgURL = thumb.dataset.bg;
    document.body.style.backgroundImage = `url('${bgURL}')`;
    localStorage.setItem('ghibli_bg', bgURL);
  });
});

// Restaurar fondo si se guardó antes
const savedBG = localStorage.getItem('ghibli_bg');
if (savedBG) {
  document.body.style.backgroundImage = `url('${savedBG}')`;
}