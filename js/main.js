document.addEventListener("DOMContentLoaded",()=>{
  const greetingText=document.getElementById("greetingText");
  const todayDate=document.getElementById("todayDate");
  const todayHijri=document.getElementById("todayHijri");
  const dayRamadhan=document.getElementById("dayRamadhan");
  const nextPrayerEl=document.getElementById("nextPrayer");
  const countdownEl=document.getElementById("countdown");

  const hour=new Date().getHours();
  let greeting="Selamat ";
  if(hour<12) greeting+="Pagi ☀️";
  else if(hour<15) greeting+="Siang 🌤️";
  else if(hour<18) greeting+="Sore 🌇";
  else greeting+="Malam 🌙";
  greetingText.textContent=greeting;

  const now=new Date();
  todayDate.textContent=now.toLocaleDateString('id-ID',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

  fetch('https://api.aladhan.com/v1/gToH?date='+now.getDate()+'-'+(now.getMonth()+1)+'-'+now.getFullYear())
  .then(res=>res.json())
  .then(data=>{
    todayHijri.textContent=`Hijri: ${data.data.hijri.day} ${data.data.hijri.month.en} ${data.data.hijri.year}`;
    dayRamadhan.textContent=`Hari ke-${data.data.hijri.day} Ramadhan`;
  });

  nextPrayerEl.textContent="Sholat Dzuhur";
  countdownEl.textContent="02:35:20";
});
