const muhasabahEl = document.getElementById("muhasabah");
const saveBtn = document.getElementById("saveMuhasabah");

if(muhasabahEl) muhasabahEl.value = localStorage.getItem("muhasabah")||"";

saveBtn?.addEventListener("click", ()=>{
  localStorage.setItem("muhasabah", muhasabahEl.value);
  alert("Muhasabah tersimpan ✅");
});
