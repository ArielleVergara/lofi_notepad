// font styling
function formatText(command) {
  document.execCommand(command, false, null);
}

function changeFontSize(size) {
  document.execCommand("fontSize", false, "7"); // 7 = tamaño máximo
  const fontElements = document.getElementsByTagName("font");
  for (let i = 0; i < fontElements.length; i++) {
    if (fontElements[i].size === "7") {
      fontElements[i].removeAttribute("size");
      fontElements[i].style.fontSize = size;
    }
  }
}

function changeTextColor(color) {
  document.execCommand("foreColor", false, color);
}

function downloadNotes() {
  const content = document.getElementById("notes").innerText; // <- solo texto
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "mis-notas.txt";
  a.click();

  URL.revokeObjectURL(url);
}

// background selecting setting
const thumbs = document.querySelectorAll('.bg-thumb');
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const bgURL = thumb.dataset.bg;
    document.body.style.backgroundImage = `url('${bgURL}')`;
    localStorage.setItem('ghibli_bg', bgURL);
  });
});

// background loading setting
const savedBG = localStorage.getItem('ghibli_bg');
if (savedBG) {
  document.body.style.backgroundImage = `url('${savedBG}')`;
}

const uploadInput = document.getElementById("upload-bg");

uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageUrl = e.target.result;
    document.body.style.backgroundImage = `url('${imageUrl}')`;
    localStorage.setItem('ghibli_bg', imageUrl); // Guarda para mantenerlo al recargar
    const newThumb = document.createElement("img");
    newThumb.src = imageUrl;
    newThumb.className = "bg-thumb";
    newThumb.dataset.bg = imageUrl;

    newThumb.addEventListener("click", () => {
      document.body.style.backgroundImage = `url('${imageUrl}')`;
      localStorage.setItem('ghibli_bg', imageUrl);
    });

    // 3. Insertar en el carrusel
    const carousel = document.querySelector(".bg-carousel");
    carousel.insertBefore(newThumb, carousel.firstChild);
  };
  reader.readAsDataURL(file);
});



// autosave notepad setting
const notes = document.getElementById('notes');
// const saveStatus = document.getElementById("save-status");


/* notes.addEventListener('input', () => {
  const safeHTML = sanitizeHTML(notes.innerHTML);
  localStorage.setItem('misNotas', safeHTML);
  showSaveStatus();
}); */

/* function showSaveStatus() {
  saveStatus.classList.add("visible");
  clearTimeout(window._saveTimeout);
  window._saveTimeout = setTimeout(() => {
    saveStatus.classList.remove("visible");
  }, 1200);
} */

/* // keeping whatever is written
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("misNotas");
  notes.innerHTML = "";
  if (saved) {
    notes.innerHTML = sanitizeHTML(saved);
  }
}); */

