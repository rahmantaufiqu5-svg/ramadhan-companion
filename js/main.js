const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".bottom-nav button");

function showPage(pageId){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
}

navButtons.forEach(btn=>{
  btn.addEventListener("click",()=>showPage(btn.dataset.page));
});

// Tampilkan tanggal & hari Ramadhan
const todayDateEl = document.getElementById("todayDate");
const ramadhanDayEl = document.getElementById("ramadhanDay");
const countdownIftarEl = document.getElementById("countdownIftar");

function updateDate(){
  const today = new Date();
  todayDateEl.textContent = today.toLocaleDateString('id-ID', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  
  // Contoh: Ramadhan mulai 10 Maret
  const startRamadhan = new Date(today.getFullYear(),2,10);
  const diff = Math.floor((today - startRamadhan)/(1000*60*60*24)) +1;
  ramadhanDayEl.textContent = `Hari ke-${diff} Ramadhan`;
  
  // Countdown buka puasa (Maghrib jam 18:00)
  const maghrib = new Date();
  maghrib.setHours(18,0,0,0);
  let remaining = maghrib - today;
  if(remaining<0) remaining=0;
  const hrs = Math.floor(remaining/1000/60/60);
  const mins = Math.floor((remaining/1000/60)%60);
  const secs = Math.floor((remaining/1000)%60);
  countdownIftarEl.textContent = `Buka puasa dalam: ${hrs}j ${mins}m ${secs}s`;
}
setInterval(updateDate,1000);
updateDate();

// Jadwal sholat berikutnya
const nextPrayerEl = document.getElementById("nextPrayer");
const countdownPrayerEl = document.getElementById("countdownPrayer");

async function loadPrayerTimes(){
  try{
    const res = await fetch("/.netlify/functions/prayer");
    const data = await res.json();
    const now = new Date();
    let next = null;
    for(const [name,time] of Object.entries(data)){
      const [h,m]=time.split(":");
      const prayerDate=new Date();
      prayerDate.setHours(h,m,0,0);
      if(prayerDate>now){
        next = {name,time:prayerDate};
        break;
      }
    }
    if(!next){
      const first = Object.entries(data)[0];
      const [h,m] = first[1].split(":");
      const prayerDate = new Date();
      prayerDate.setDate(prayerDate.getDate()+1);
      prayerDate.setHours(h,m,0,0);
      next = {name:first[0],time:prayerDate};
    }
    nextPrayerEl.textContent = `${next.name} - ${next.time.toLocaleTimeString()}`;
    function updateCountdown(){
      const diff = next.time - new Date();
      const hrs=Math.floor(diff/1000/60/60);
      const mins=Math.floor((diff/1000/60)%60);
      const secs=Math.floor((diff/1000)%60);
      countdownPrayerEl.textContent = `Dalam: ${hrs}j ${mins}m ${secs}s`;
    }
    updateCountdown();
    setInterval(updateCountdown,1000);
  }catch(err){
    nextPrayerEl.textContent="Gagal memuat jadwal";
    countdownPrayerEl.textContent="";
  }
}

loadPrayerTimes();
const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".bottom-nav button");
const toastContainer=document.createElement("div");
toastContainer.id="toastContainer";
document.body.appendChild(toastContainer);

function showToast(msg,duration=3000){
  const toast=document.createElement("div");
  toast.className="toast";
  toast.textContent=msg;
  toastContainer.appendChild(toast);
  setTimeout(()=>toast.remove(),duration);
}

// Navigasi halaman
function showPage(pageId){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  showToast(`Berpindah ke ${pageId.charAt(0).toUpperCase()+pageId.slice(1)}`,1500);
}

navButtons.forEach(btn=>{
  btn.addEventListener("click",()=>showPage(btn.dataset.page));
});

// Loader sementara fetch jadwal sholat
const nextPrayerEl = document.getElementById("nextPrayer");
const countdownPrayerEl = document.getElementById("countdownPrayer");

async function fetchPrayerTimes(){
  nextPrayerEl.textContent="Memuat...";
  countdownPrayerEl.textContent="";
  try{
    const res = await fetch("/.netlify/functions/prayer");
    const data = await res.json();
    localStorage.setItem("prayerTimes",JSON.stringify(data));
    showToast("Jadwal sholat diperbarui",2000);
    updateNextPrayer(data);
  }catch(err){
    nextPrayerEl.textContent="Gagal memuat jadwal";
    countdownPrayerEl.textContent="";
    showToast("Gagal koneksi API jadwal sholat",3000);
  }
}

function updateNextPrayer(data){
  const now = new Date();
  let next=null;
  for(const [name,time] of Object.entries(data)){
    const [h,m]=time.split(":");
    const prayerDate=new Date();
    prayerDate.setHours(h,m,0,0);
    if(prayerDate>now){
      next={name,time:prayerDate};
      break;
    }
  }
  if(!next){
    const first=Object.entries(data)[0];
    const [h,m]=first[1].split(":");
    const prayerDate=new Date();
    prayerDate.setDate(prayerDate.getDate()+1);
    prayerDate.setHours(h,m,0,0);
    next={name:first[0],time:prayerDate};
  }
  nextPrayerEl.textContent=`${next.name} - ${next.time.toLocaleTimeString()}`;
  function countdown(){
    const diff=next.time - new Date();
    const hrs=Math.floor(diff/1000/60/60);
    const mins=Math.floor((diff/1000/60)%60);
    const secs=Math.floor((diff/1000)%60);
    countdownPrayerEl.textContent=`Dalam: ${hrs}j ${mins}m ${secs}s`;
  }
  countdown();
  setInterval(countdown,1000);
}

fetchPrayerTimes();
setInterval(fetchPrayerTimes,3600000); // Update tiap jam
