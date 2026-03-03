const amalList = [
  "Sholat 5 Waktu",
  "Tarawih",
  "Baca Qur'an",
  "Sedekah"
];

const checklistDiv = document.getElementById("checklist");

function loadChecklist() {
  checklistDiv.innerHTML = "";
  amalList.forEach((amal, index) => {
    const checked = localStorage.getItem("amal_" + index) === "true";
    checklistDiv.innerHTML += `
      <label>
        <input type="checkbox" onchange="saveChecklist(${index}, this.checked)" ${checked ? "checked" : ""}>
        ${amal}
      </label><br>
    `;
  });
  updateProgress();
}

function saveChecklist(index, value) {
  localStorage.setItem("amal_" + index, value);
  updateProgress();
}

function updateProgress() {
  let total = amalList.length;
  let done = 0;
  for (let i = 0; i < total; i++) {
    if (localStorage.getItem("amal_" + i) === "true") done++;
  }
  document.getElementById("progressText").innerText =
    `Progress: ${done}/${total}`;
}

loadChecklist();
