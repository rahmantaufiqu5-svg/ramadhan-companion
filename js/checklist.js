let checklistData=JSON.parse(localStorage.getItem("checklist"))||[];
const checklistEl=document.getElementById("checklist");
const progressFill=document.getElementById("progressFill");
const progressText=document.getElementById("progressText");
const addTaskBtn=document.getElementById("addTaskBtn");

function renderChecklist(){
  checklistEl.innerHTML="";
  let completed=0;
  checklistData.forEach((task,i)=>{
    const div=document.createElement("div");
    div.className="task-item";
    div.innerHTML=`<input type="checkbox" ${task.done?"checked":""} onchange="toggleTask(${i})"> ${task.name} <button onclick="deleteTask(${i})">🗑️</button>`;
    checklistEl.appendChild(div);
    if(task.done) completed++;
  });
  let percent=checklistData.length?Math.round(completed/checklistData.length*100):0;
  progressFill.style.width=percent+"%";
  progressText.textContent=`${percent}% selesai`;
  localStorage.setItem("checklist",JSON.stringify(checklistData));
}

function toggleTask(index){
  checklistData[index].done=!checklistData[index].done;
  renderChecklist();
}

function deleteTask(index){
  checklistData.splice(index,1);
  renderChecklist();
}

addTaskBtn.addEventListener("click",()=>{
  let taskName=prompt("Nama amal / tugas:");
  if(taskName){
    checklistData.push({name:taskName,done:false});
    renderChecklist();
  }
});

renderChecklist();
