const themeToggleBtn=document.getElementById("themeToggle");
const darkModeToggle=document.getElementById("darkModeToggle");

function setDarkMode(enable){
  if(enable){
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode",true);
  }else{
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode",false);
  }
}

themeToggleBtn.addEventListener("click",()=>{
  const enabled=document.body.classList.contains("dark-mode");
  setDarkMode(!enabled);
});

darkModeToggle?.addEventListener("change",(e)=>setDarkMode(e.target.checked));

// Inisialisasi
if(localStorage.getItem("darkMode")==="true") setDarkMode(true);
const themeToggleBtn=document.getElementById("themeToggle");
function setDarkMode(enable){
  if(enable){
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode",true);
    showToast("Dark mode aktif",1000);
  }else{
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode",false);
    showToast("Dark mode nonaktif",1000);
  }
}
themeToggleBtn.addEventListener("click",()=>{
  setDarkMode(!document.body.classList.contains("dark-mode"));
});
if(localStorage.getItem("darkMode")==="true") setDarkMode(true);
