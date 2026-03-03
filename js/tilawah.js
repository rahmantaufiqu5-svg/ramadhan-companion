let tilawahValue = 0;
const tilawahDisplay = document.getElementById("tilawahValue");

function addTilawah(amount) {
  tilawahValue += amount;
  if(tilawahValue < 0) tilawahValue = 0;
  if(tilawahDisplay) tilawahDisplay.textContent = tilawahValue;
}
