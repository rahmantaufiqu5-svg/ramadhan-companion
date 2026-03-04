const statsChartEl=document.getElementById("statsChart");

function renderStats(){
  const ctx=statsChartEl.getContext('2d');
  const tilawahData=JSON.parse(localStorage.getItem("tilawah"))||{};
  const checklistData=JSON.parse(localStorage.getItem("checklist"))||{};
  const labels=Object.keys(tilawahData).slice(-30); // 30 hari terakhir
  const tilawahValues=labels.map(d=>tilawahData[d]?.progress||0);
  const checklistPercent=labels.map(d=>{
    const today=checklistData[d]||[];
    if(today.length===0) return 0;
    const done=today.filter(t=>t.done).length;
    return Math.round(done/today.length*100);
  });

  if(window.statsChart) window.statsChart.destroy();

  window.statsChart=new Chart(ctx,{
    type:'line',
    data:{
      labels,
      datasets:[
        {label:'Tilawah (Juz)',data:tilawahValues,borderColor:'blue',fill:false},
        {label:'Checklist Amal (%)',data:checklistPercent,borderColor:'green',fill:false}
      ]
    },
    options:{responsive:true,maintainAspectRatio:false}
  });
}

renderStats();
setInterval(renderStats,60000);
