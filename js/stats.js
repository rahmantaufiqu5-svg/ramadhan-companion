let statsData = JSON.parse(localStorage.getItem("stats")) || {};
const statsChartEl = document.getElementById("statsChart");
const calendarEl = document.getElementById("calendar");

const todayKey = new Date().toLocaleDateString('id-ID');

// Simpan progress checklist & tilawah ke statsData
function updateStats(){
  const checklistToday = JSON.parse(localStorage.getItem("checklist")) || {};
  const tilawahToday = JSON.parse(localStorage.getItem("tilawah")) || {};
  
  statsData[todayKey] = {
    checklistDone: checklistToday[todayKey]?.filter(t=>t.done).length || 0,
    checklistTotal: checklistToday[todayKey]?.length || 0,
    tilawah: tilawahToday[todayKey]?.progress || 0
  };
  localStorage.setItem("stats",JSON.stringify(statsData));
}

// Gambar Chart.js
function renderChart(){
  const labels = Object.keys(statsData);
  const checklistPercent = labels.map(d=>{
    const data = statsData[d];
    return data.checklistTotal>0 ? Math.round(data.checklistDone/data.checklistTotal*100) : 0;
  });
  const tilawahProgress = labels.map(d=>statsData[d].tilawah);

  const ctx = statsChartEl.getContext('2d');
  new Chart(ctx,{
    type:'bar',
    data:{
      labels:labels,
      datasets:[
        {label:'Checklist (%)', data:checklistPercent, backgroundColor:'#0f172a'},
        {label:'Tilawah (Juz)', data:tilawahProgress, backgroundColor:'#facc15'}
      ]
    },
    options:{
      responsive:true,
      scales:{y:{beginAtZero:true}}
    }
  });
}

// Kalender Ramadhan Interaktif
function renderCalendar(){
  const start = new Date();
  start.setDate(1);
  calendarEl.innerHTML = "";
  for(let i=0;i<30;i++){
    const date = new Date();
    date.setDate(date.getDate()+i);
    const key = date.toLocaleDateString('id-ID');
    const div=document.createElement("div");
    div.className="calendar-day";
    div.textContent=date.getDate();

    // Warna sesuai progress
    if(statsData[key]){
      const data=statsData[key];
      const percent = data.checklistTotal>0 ? Math.round(data.checklistDone/data.checklistTotal*100) : 0;
      if(percent===100) div.style.backgroundColor="#22c55e"; // hijau
      else if(percent>0) div.style.backgroundColor="#facc15"; // kuning
      else div.style.backgroundColor="#ef4444"; // merah
    } else div.style.backgroundColor="#e2e8f0";

    div.addEventListener("click",()=>{
      alert(`${key}\nChecklist Done: ${statsData[key]?.checklistDone || 0}/${statsData[key]?.checklistTotal || 0}\nTilawah: ${statsData[key]?.tilawah || 0} Juz`);
    });

    calendarEl.appendChild(div);
  }
}

updateStats();
renderChart();
renderCalendar();
