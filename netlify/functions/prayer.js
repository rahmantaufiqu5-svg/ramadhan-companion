exports.handler = async function(event,context){
  // Contoh: waktu sholat statis
  const prayerTimes = {
    Fajr: "04:30",
    Dhuhr: "12:00",
    Asr: "15:30",
    Maghrib: "18:00",
    Isha: "19:30"
  };
  return {
    statusCode:200,
    body: JSON.stringify(prayerTimes)
  };
};
