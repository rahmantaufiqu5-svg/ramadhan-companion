// Tanggal Hari Ini
const today = new Date();
document.getElementById("todayDate").innerText = today.toDateString();

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}

// Ambil Jadwal Sholat
fetch('/.netlify/functions/prayer')
  .then(res => res.json())
  .then(data => {
    document.getElementById("prayerTimes").innerText =
      `Subuh: ${data.subuh}
Dzuhur: ${data.dzuhur}
Ashar: ${data.ashar}
Maghrib: ${data.maghrib}
Isya: ${data.isya}`;
  });
