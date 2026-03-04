const sedekahHistoryEl=document.getElementById("sedekahHistory");
let sedekahData=JSON.parse(localStorage.getItem("sedekah"))||{};
if(!sedekahData[todayKey]) sedekahData[todayKey]=[];

document.getElementById("addSedekah").addEventListener("click",()=>{
  const val=prompt("Masukkan jumlah sedekah hari ini:");
  if(val) sedekahData[todayKey].push(parseFloat(val));
  localStorage.setItem("sedekah",JSON.stringify(sedekahData));
  renderSedekah();
});

function renderSedekah(){
  sedekahHistoryEl.innerHTML="";
  sedekahData[todayKey].forEach((v,i)=>{
    const div=document.createElement("div");
    div.textContent=`${i+1}. Rp ${v}`;
    sedekahHistoryEl.appendChild(div);
  });
}

renderSedekah();
