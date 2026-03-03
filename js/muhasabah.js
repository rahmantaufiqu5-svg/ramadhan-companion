let muhasabahData = JSON.parse(localStorage.getItem("muhasabah")) || [];
const muhasabahInput = document.getElementById("muhasabahInput");
const saveMuhasabahBtn = document.getElementById("saveMuhasabah");
const muhasabahHistory = document.getElementById("muhasabahHistory");

function renderMuhasabah() {
  muhasabahHistory.innerHTML = "";
  muhasabahData.slice().reverse().forEach(entry => {
    const div = document.createElement("div");
    div.className = "muhasabah-entry";
    div.innerHTML = `<p>${entry.date}: ${entry.text}</p>`;
    muhasabahHistory.appendChild(div);
  });
}

function saveMuhasabah() {
  const text = muhasabahInput.value.trim();
  if (!text) return;
  const today = new Date().toLocaleDateString('id-ID');
  muhasabahData.push({ date: today, text });
  localStorage.setItem("muhasabah", JSON.stringify(muhasabahData));
  muhasabahInput.value = "";
  renderMuhasabah();
}

saveMuhasabahBtn.addEventListener("click", saveMuhasabah);

// Autosave setiap 5 detik
setInterval(() => {
  if (muhasabahInput.value.trim()) {
    saveMuhasabah();
  }
}, 5000);

renderMuhasabah();
