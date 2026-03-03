function setNextPrayer() {
  const nextPrayerEl = document.getElementById("nextPrayer");
  const countdownEl = document.getElementById("countdown");
  if(!nextPrayerEl || !countdownEl) return;

  nextPrayerEl.textContent = "Maghrib";
  countdownEl.textContent = "00:35:20"; // dummy countdown
}

setNextPrayer();
