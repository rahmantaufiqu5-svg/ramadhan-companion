const statsText = document.getElementById("statsText");

function updateStats(){
  const checklistSaved = JSON.parse(localStorage.getItem("checklistProgress")||"[]");
  const tilawahSaved = parseFloat(localStorage.getItem("tilawahValue")||0);
  const completed = checklistSaved.filter(v=>v).length;
  if(statsText) statsText.textContent = `Checklist selesai: ${completed}/${checklistSaved.length}, Tilawah: ${tilawahSaved} Juz`;
}

setInterval(updateStats,1000);
updateStats();
