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
    tilawah: tilawahToday
