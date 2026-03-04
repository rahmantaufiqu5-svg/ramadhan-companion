const calendarEl=document.getElementById("calendar");

function renderCalendar(){
  const today=new Date();
  const year=today.getFullYear();
  const month=today.getMonth();
  const firstDay=new Date(year,month,1).getDay();
  const lastDate=new Date(year,month+1,0).getDate();

  calendarEl.innerHTML="";
  const table=document.createElement("table");
  const header=document.createElement("tr");
  ["Min","Sen","Sel","Rab","Kam","Jum","Sab"].forEach(d=>{
    const th=document.createElement("th"); th.textContent=d; header.appendChild(th);
  });
  table.appendChild(header);

  let row=document.createElement("tr");
  for(let i=0;i<firstDay;i++){
    row.appendChild(document.createElement("td"));
  }

  for(let date=1;date<=lastDate;date++){
    if(row.children.length===7){
      table.appendChild(row);
      row=document.createElement("tr");
    }
    const td=document.createElement("td");
    td.textContent=date;

    const key=`${year}-${month+1}-${date}`;
    if(JSON.parse(localStorage.getItem("checklist"))?.[key]) td.classList.add("done-checklist");
    if(JSON.parse(localStorage.getItem("tilawah"))?.[key]) td.classList.add("done-tilawah");
    row.appendChild(td);
  }
  table.appendChild(row);
  calendarEl.appendChild(table);
}

renderCalendar();
setInterval(renderCalendar,60000);
