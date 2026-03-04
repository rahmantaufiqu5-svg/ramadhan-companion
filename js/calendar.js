// Fungsi untuk merender Kalender Masehi & Hijriah
function renderCalendar() {
    const container = document.getElementById('calendar-container');
    if (!container) return;

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Mengambil tanggal Hijriah otomatis menggunakan Intl API bawaan browser
    const hijriFormatter = new Intl.DateTimeFormat('id-TN-u-ca-islamic', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    const hijriDate = hijriFormatter.format(today);

    // Menghitung hari pertama dan jumlah hari dalam bulan ini
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    let html = `
        <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div class="text-center mb-6">
                <h3 class="font-black text-2xl text-indigo-600 dark:text-indigo-400 tracking-wide">${monthNames[currentMonth]} ${currentYear}</h3>
                <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1"><i class="fas fa-moon mr-1"></i> ${hijriDate}</p>
            </div>
            
            <div class="grid grid-cols-7 gap-1 text-center mb-2">
    `;

    // Looping nama hari (Min, Sen, Sel, dst)
    dayNames.forEach(day => {
        const isWeekend = day === 'Min' ? 'text-red-500' : 'text-slate-400';
        html += `<div class="text-xs font-bold ${isWeekend} py-1">${day}</div>`;
    });

    html += `</div><div class="grid grid-cols-7 gap-2 text-center">`;

    // Membuat kotak kosong untuk hari sebelum tanggal 1
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="p-2"></div>`;
    }

    // Looping tanggal 1 sampai akhir bulan
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate();
        // Jika hari ini, warnanya ungu gelap. Jika bukan, warna standar.
        const bgClass = isToday 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110' 
            : 'bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-indigo-100 dark:hover:bg-indigo-900/30';
        
        html += `
            <div class="p-2 rounded-xl flex items-center justify-center aspect-square ${bgClass} font-bold text-sm transition-all duration-200">
                ${day}
            </div>
        `;
    }

    html += `</div></div>`;
    container.innerHTML = html;
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderCalendar);
