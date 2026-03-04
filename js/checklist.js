const checklistEl=document.getElementById("checklist");
const progressFill=document.getElementById("progressFill");
const progressText=document.getElementById("progressText");

let checklistData=JSON.parse(localStorage.getItem("checklist"))||{};
const todayKey=new Date().toLocaleDateString('id-ID');

if(!checklistData[todayKey]) checklistData[todayKey]=[
  {name:"Sholat Fardhu",done:false},
  {name:"Tilawah",done:false},
  {name:"Sedekah",done:false}
];

function saveChecklist(){
  localStorage.setItem("checklist",JSON.stringify(checklistData));
  updateProgress();
}

function renderChecklist(){
  checklistEl.innerHTML="";
  checklistData[todayKey].forEach((item,i)=>{
    const div=document.createElement("div");
    div.innerHTML=`<label><input type="checkbox" ${item.done?"checked":""} data-index="${i}"> ${item.name}</label>`;
    checklistEl.appendChild(div);
  });
  checklistEl.querySelectorAll("input[type=checkbox]").forEach(cb=>{
    cb.addEventListener("change",e=>{
      const idx=parseInt(e.target.dataset.index);
      checklistData[todayKey][idx].done=e.target.checked;
      saveChecklist();
    });
  });
}

function updateProgress(){
  const done=checklistData[todayKey].filter(t=>t.done).length;
  const total=checklistData[todayKey].length;
  const percent=total>0?Math.round(done/total*100):0;
  progressFill.style.width=`${percent}%`;
  progressText.textContent=`${done}/${total} Amal Selesai`;
}

renderChecklist();
updateProgress();
