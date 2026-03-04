let muhasabahData = JSON.parse(localStorage.getItem("muhasabah")) || {};
const muhasabahInput = document.getElementById("muhasabahInput");
const saveMuhasabahBtn = document.getElementById("saveMuhasabah");
const muhasabahHistory = document.getElementById("muhasabahHistory");

const todayKey = new Date().toLocaleDateString('id-ID');
if(!muhasabahData[todayKey]) muhasabahData[todayKey]="";

function renderMuhasabah(){
  muhasabahHistory.innerHTML = "";
  for(let date in muhasabahData){
    const div=document.createElement("div");
    div.className="muhasabah-entry";
    div.innerHTML=`<strong>${date}:</strong> ${muhasabahData[date]}`;
    muhasabahHistory.appendChild(div);
  }
}

function saveMuhasabah(){
  muhasabahData[todayKey] = muhasabahInput.value;
  localStorage.setItem("muhasabah",JSON.stringify(muhasabahData));
  renderMuhasabah();
}

saveMuhasabahBtn.addEventListener("click", saveMuhasabah);

// Autosave 5 detik
setInterval(()=>{if(muhasabahInput.value.trim()) saveMuhasabah()},5000);

renderMuhasabah();
