let checklistData = JSON.parse(localStorage.getItem("checklist")) || {};
const checklistEl = document.getElementById("checklist");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const todayKey = new Date().toLocaleDateString('id-ID');

// Default task
if(!checklistData[todayKey]){
  checklistData[todayKey] = [
    { text: "Sholat 5 waktu", done: false },
    { text: "Tilawah 1 juz", done: false },
    { text: "Sedekah", done: false },
  ];
}

function renderChecklist() {
  checklistEl.innerHTML = "";
  const tasks = checklistData[todayKey];
  tasks.forEach((task,index)=>{
    const div = document.createElement("div");
    div.className="checklist-item";
    div.innerHTML=`<input type="checkbox" id="task${index}" ${task.done ? "checked" : ""}>
                   <label for="task${index}">${task.text}</label>`;
    const checkbox = div.querySelector("input");
    checkbox.addEventListener("change", ()=>{
      task.done = checkbox.checked;
      saveChecklist();
    });
    checklistEl.appendChild(div);
  });
  updateProgress();
}

function updateProgress(){
  const tasks = checklistData[todayKey];
  const doneCount = tasks.filter(t=>t.done).length;
  const percent = Math.round(doneCount/tasks.length*100);
  progressFill.style.width = percent+"%";
  progressText.textContent = `${percent}% tercapai`;
}

function saveChecklist(){
  localStorage.setItem("checklist",JSON.stringify(checklistData));
  updateProgress();
}

renderChecklist();
