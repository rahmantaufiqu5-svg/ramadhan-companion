let tilawahData = JSON.parse(localStorage.getItem("tilawah")) || {};
const tilawahValueEl = document.getElementById("tilawahValue");
const todayKey = new Date().toLocaleDateString('id-ID');

if(!tilawahData[todayKey]){
  tilawahData[todayKey] = { progress:0 };
}

function updateTilawahUI(){
  tilawahValueEl.textContent = tilawahData[todayKey].progress.toFixed(2);
  localStorage.setItem("tilawah",JSON.stringify(tilawahData));
}

function addTilawah(amount){
  tilawahData[todayKey].progress += amount;
  if(tilawahData[todayKey].progress <0) tilawahData[todayKey].progress=0;
  updateTilawahUI();
}

updateTilawahUI();
