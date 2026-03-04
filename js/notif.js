if("Notification" in window){
  Notification.requestPermission();
}

function notify(title,body){
  if(Notification.permission==="granted"){
    new Notification(title,{body});
  }
}

// Contoh reminder sholat
setInterval(()=>{
  const now=new Date();
  const sholatTimes=JSON.parse(localStorage.getItem("prayerTimes")||"{}");
  Object.entries(sholatTimes).forEach(([name,time])=>{
    const [h,m]=time.split(":");
    if(now.getHours()===+h && now.getMinutes()===+m && now.getSeconds()===0){
      notify(`Waktu Sholat ${name}`,"Jangan lupa sholat tepat waktu!");
    }
  });
},1000);
