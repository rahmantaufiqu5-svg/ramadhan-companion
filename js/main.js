function setGreeting() {
  const hour = new Date().getHours();
  const greetingText = document.getElementById("greetingText");
  if(!greetingText) return;

  if(hour >= 4 && hour < 11) greetingText.textContent = "Selamat Pagi 🌅";
  else if(hour >= 11 && hour < 15) greetingText.textContent = "Selamat Siang ☀️";
  else if(hour >= 15 && hour < 18) greetingText.textContent = "Selamat Sore 🌇";
  else greetingText.textContent = "Selamat Malam 🌙";
}

function setTodayDate() {
  const today = new Date();
  const options = { weekday: 'long', year:'numeric', month:'long', day:'numeric'};
  const todayDateEl = document.getElementById("todayDate");
  if(todayDateEl) todayDateEl.textContent = today.toLocaleDateString('id-ID', options);
}

setGreeting();
setTodayDate();
