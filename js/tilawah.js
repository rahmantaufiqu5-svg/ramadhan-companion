const tilawahValueEl=document.getElementById("tilawahValue");
let tilawahData=JSON.parse(localStorage.getItem("tilawah"))||{};
if(!tilawahData[todayKey]) tilawahData[todayKey]={progress:0};

function saveTilawah(){localStorage.setItem("tilawah",JSON.stringify(tilawahData)); renderTilawah();}
function renderTilawah(){tilawahValueEl.textContent=tilawahData[todayKey].progress;}
function addTilawah(juz){
  tilawahData[todayKey].progress=Math.max(0,(tilawahData[todayKey].progress+juz));
  saveTilawah();
}

renderTilawah();
