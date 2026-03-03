let tilawahData = JSON.parse(localStorage.getItem("tilawah")) || { progress: 0, target: 1 }; // target 1 Juz/hari
const tilawahValueEl = document.getElementById("tilawahValue");

function updateTilawahUI() {
  tilawahValueEl.textContent = tilawahData.progress.toFixed(2);
  localStorage.setItem("tilawah", JSON.stringify(tilawahData));
}

function addTilawah(amount) {
  tilawahData.progress += amount;
  if(tilawahData.progress < 0) tilawahData.progress = 0;
  updateTilawahUI();
  checkTilawahNotification();
}

function checkTilawahNotification() {
  if (tilawahData.progress < tilawahData.target) {
    console.log("Belum mencapai target tilawah hari ini!");
  } else {
    console.log("Selamat, target tilawah hari ini sudah tercapai ✅");
  }
}

updateTilawahUI();
