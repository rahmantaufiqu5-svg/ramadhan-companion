exports.handler = async function () {
  return {
    statusCode: 200,
    body: JSON.stringify({
      subuh: "04:45",
      dzuhur: "12:05",
      ashar: "15:20",
      maghrib: "18:10",
      isya: "19:15"
    })
  };
};
