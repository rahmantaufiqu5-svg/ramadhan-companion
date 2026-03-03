const toggle = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const mode = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("theme", mode);
});
