exports.handler = async function(event, context) {
  // Dummy Jadwal Sholat
  const prayerTimes = {
    Fajr: "05:07",
    Dhuhr: "12:30",
    Asr: "15:40",
    Maghrib: "18:35",
    Isha: "19:45"
  };
  return {
    statusCode: 200,
    body: JSON.stringify(prayerTimes)
  };
};
