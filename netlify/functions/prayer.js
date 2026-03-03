const nextPrayerEl = document.getElementById("nextPrayer");
const countdownEl = document.getElementById("countdown");

function setNextPrayer() {
  const prayers = [
    {name:"Subuh", hour:5, min:07},
    {name:"Dzuhur", hour:12, min:30},
    {name:"Ashar", hour:15, min:35},
    {name:"Maghrib", hour:18, min:35},
    {name:"Isya", hour:19, min:44}
  ];
  const now = new Date();
  let next = prayers.find(p=> p.hour>now.getHours() || (p.hour===now.getHours() && p.min>now.getMinutes()));
  if(!next) next = prayers[0];

  if(nextPrayerEl) nextPrayerEl.textContent = next.name;

  // Countdown
  const nextTime = new Date();
  nextTime.setHours(next.hour, next.min,0,0);
  let diff = nextTime-now;
  if(diff<0) diff+=24*60*60*1000; // next day
  const hours = Math.floor(diff/3600000);
  const mins = Math.floor((diff%3600000)/60000);
  const secs = Math.floor((diff%60000)/1000);
  if(countdownEl) countdownEl.textContent = `${hours.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}

setInterval(setNextPrayer,1000);
setNextPrayer();
