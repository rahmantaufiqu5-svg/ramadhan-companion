const checklist = [
  "Sholat 5 Waktu",
  "Tilawah 1 Juz",
  "Sedekah",
  "Dzikir Pagi & Petang"
];

function renderChecklist() {
  const container = document.getElementById("checklist");
  const progressText = document.getElementById("progressText");
  const progressFill = document.getElementById("progressFill");
  if (!container) return;

  container.innerHTML = "";

  checklist.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<input type="checkbox" id="check${index}" /> <label for="check${index}">${item}</label>`;
    container.appendChild(div);

    const checkbox = div.querySelector("input");
    checkbox.addEventListener("change", updateProgress);
  });

  function updateProgress() {
    let count = 0;
    container.querySelectorAll("input").forEach(cb => { if(cb.checked) count++; });
    const percent = Math.round((count / checklist.length) * 100);
    if (progressFill) progressFill.style.width = percent + "%";
    if (progressText) progressText.textContent = `${count} / ${checklist.length} selesai`;
  }

  updateProgress();
}

renderChecklist();
