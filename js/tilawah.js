let tilawah = parseFloat(localStorage.getItem("tilawah")) || 0;

function updateTilawah() {
  document.getElementById("tilawahValue").innerText = tilawah;
  localStorage.setItem("tilawah", tilawah);
}

function addTilawah(value) {
  tilawah += value;
  updateTilawah();
}

updateTilawah();
