// autosave notepad setting
const notes = document.getElementById('notes');
notes.value = localStorage.getItem('ghibli_notes') || '';

notes.addEventListener('input', () => {
  localStorage.setItem('ghibli_notes', notes.value);
});

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
  const content = document.getElementById("notes").innerHTML;
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mis-notas.html";
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

// notepad download setting
document.getElementById('download-notes').addEventListener('click', () => {
  const text = document.getElementById('notes').value;
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'my-notepad.txt';
  a.click();

  URL.revokeObjectURL(url); // cleaning
});