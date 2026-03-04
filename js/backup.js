const resetBtn=document.getElementById("resetData");
const exportBtn=document.getElementById("exportData");
const importBtn=document.getElementById("importData");

resetBtn.addEventListener("click",()=>{
  if(confirm("Yakin reset semua data?")){
    localStorage.clear();
    alert("Semua data telah dihapus.");
    location.reload();
  }
});

exportBtn.addEventListener("click",()=>{
  const data=JSON.stringify({
    tilawah:localStorage.getItem("tilawah"),
    checklist:localStorage.getItem("checklist"),
    muhasabah:localStorage.getItem("muhasabah"),
    sedekah:localStorage.getItem("sedekah")
  });
  const blob=new Blob([data],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download="ramadhan-companion-backup.json";
  a.click();
  URL.revokeObjectURL(url);
});

importBtn.addEventListener("click",()=>{
  const file=document.createElement("input");
  file.type="file";
  file.accept=".json";
  file.addEventListener("change",e=>{
    const reader=new FileReader();
    reader.onload=function(){ 
      const data=JSON.parse(reader.result);
      Object.keys(data).forEach(k=>{
        if(data[k]) localStorage.setItem(k,JSON.stringify(data[k]));
      });
      alert("Restore selesai!"); location.reload();
    };
    reader.readAsText(e.target.files[0]);
  });
  file.click();
});
const resetBtn=document.getElementById("resetData");
const exportBtn=document.getElementById("exportData");
const importBtn=document.getElementById("importData");

resetBtn.addEventListener("click",()=>{
  if(confirm("Yakin reset semua data?")){
    localStorage.clear();
    location.reload();
    showToast("Semua data dihapus",2000);
  }
});

exportBtn.addEventListener("click",()=>{
  const data=JSON.stringify({
    tilawah:localStorage.getItem("tilawah"),
    checklist:localStorage.getItem("checklist"),
    muhasabah:localStorage.getItem("muhasabah"),
    sedekah:localStorage.getItem("sedekah")
  });
  const blob=new Blob([data],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="backup-ramadhan-companion.json";
  a.click();
  showToast("Data diexport",1500);
});

importBtn.addEventListener("click",()=>{
  const file=document.createElement("input");
  file.type="file"; file.accept=".json";
  file.addEventListener("change",e=>{
    const reader=new FileReader();
    reader.onload=function(){
      const data=JSON.parse(reader.result);
      Object.keys(data).forEach(k=>{ if(data[k]) localStorage.setItem(k,JSON.stringify(data[k])); });
      showToast("Restore selesai",2000); location.reload();
    };
    reader.readAsText(e.target.files[0]);
  });
  file.click();
});
