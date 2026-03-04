const muhasabahInput=document.getElementById("muhasabahInput");
const muhasabahHistoryEl=document.getElementById("muhasabahHistory");
let muhasabahData=JSON.parse(localStorage.getItem("muhasabah"))||{};

function saveMuhasabah(){
  muhasabahData[todayKey]=muhasabahInput.value;
  localStorage.setItem("muhasabah",JSON.stringify(muhasabahData));
  renderMuhasabahHistory();
}

function renderMuhasabahHistory(){
  muhasabahHistoryEl.innerHTML="";
  Object.keys(muhasabahData).sort().reverse().forEach(date=>{
    const div=document.createElement("div");
    div.className="muhasabah-item";
    div.textContent=`${date}: ${muhasabahData[date]}`;
    muhasabahHistoryEl.appendChild(div);
  });
}

document.getElementById("saveMuhasabah").addEventListener("click",saveMuhasabah);

// Autosave setiap 5 detik
setInterval(saveMuhasabah,5000);

renderMuhasabahHistory();
