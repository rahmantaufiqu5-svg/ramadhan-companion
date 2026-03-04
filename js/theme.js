const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Cek preferensi user sebelumnya di LocalStorage
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    htmlElement.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
    htmlElement.classList.remove('dark');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
}

// Fungsi saat tombol ditekan
themeToggleBtn.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        // Pindah ke Light Mode
        htmlElement.classList.remove('dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
        showToast("Mode Terang diaktifkan ☀️");
    } else {
        // Pindah ke Dark Mode
        htmlElement.classList.add('dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
        showToast("Mode Gelap diaktifkan 🌙");
    }
});
