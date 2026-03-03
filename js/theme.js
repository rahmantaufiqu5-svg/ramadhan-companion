const themeToggle = document.getElementById("themeToggle");
themeToggle?.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark")?"dark":"light");
});

// Load theme from localStorage
if(localStorage.getItem("theme")==="dark") document.body.classList.add("dark");
