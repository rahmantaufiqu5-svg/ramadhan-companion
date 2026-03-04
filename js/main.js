document.addEventListener("DOMContentLoaded", () => {

  // NAVIGASI PAGE
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll(".bottom-nav button");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.page;
      pages.forEach(p => p.classList.remove("active"));
      document.getElementById(target).classList.add("active");
    });
  });

  // GREETING
  const greetingText = document.getElementById("greetingText");
  const hours = new Date().getHours();
  if(hours < 12) greetingText.textContent = "Selamat Pagi 🌅";
  else if(hours < 18) greetingText.textContent = "Selamat Siang ☀️";
  else greetingText.textContent = "Selamat Malam 🌙";

  // TANGGAL HARI INI
  const todayDate = document.getElementById("todayDate");
  const ramadhanDay = document.getElementById("ramadhanDay");
  const countdownIftar = document.getElementById("countdownIftar");

  const today = new Date();
  todayDate.textContent = today.toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // Hitung hari ke Ramadhan
  const ramadhanStart = new Date(today.getFullYear(), 2, 23); // misal 23 Maret
  const dayDiff = Math.floor((today - ramadhanStart)/1000/60/60/24) + 1;
  ramadhanDay.textContent = `Hari ke-${dayDiff} Ramadhan`;

  // Countdown buka puasa (Maghrib 18:00)
  function updateCountdown() {
    const maghrib = new Date(today.getFullYear(), today.getMonth(), today.getDate
