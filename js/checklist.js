// Daftar ibadah yang akan dicentang
const dailyTasks = [
    { id: 'subuh', label: 'Sholat Subuh', icon: 'fa-cloud-sun' },
    { id: 'dzuhur', label: 'Sholat Dzuhur', icon: 'fa-sun' },
    { id: 'ashar', label: 'Sholat Ashar', icon: 'fa-sun' },
    { id: 'maghrib', label: 'Sholat Maghrib', icon: 'fa-cloud-moon' },
    { id: 'isya', label: 'Sholat Isya', icon: 'fa-moon' },
    { id: 'tarawih', label: 'Sholat Tarawih', icon: 'fa-mosque' },
    { id: 'tilawah', label: 'Baca Al-Qur\'an', icon: 'fa-book-open' }
];

// Mendapatkan kunci tanggal unik untuk hari ini (Format: YYYY-MM-DD)
function getTodayDateKey() {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

// Mengambil data checklist dari LocalStorage
function getChecklistData() {
    const todayKey = getTodayDateKey();
    const savedData = localStorage.getItem(`checklist_${todayKey}`);
    return savedData ? JSON.parse(savedData) : {};
}

// Merender HTML untuk Checklist
function renderChecklist() {
    const container = document.getElementById('checklist-container');
    const data = getChecklistData();
    let html = '<div class="space-y-3">';

    dailyTasks.forEach(task => {
        const isChecked = data[task.id] ? 'checked' : '';
        const bgClass = isChecked ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700';
        
        html += `
            <label class="flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-colors duration-200 ${bgClass}">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                        <i class="fas ${task.icon}"></i>
                    </div>
                    <span class="font-medium text-lg ${isChecked ? 'text-emerald-700 dark:text-emerald-400 line-through opacity-70' : ''}">${task.label}</span>
                </div>
                <input type="checkbox" class="w-6 h-6 text-ramadhan rounded focus:ring-ramadhan accent-ramadhan" 
                       onchange="toggleTask('${task.id}', this.checked)" ${isChecked}>
            </label>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// Menyimpan status centang ke LocalStorage
function toggleTask(taskId, isChecked) {
    const todayKey = getTodayDateKey();
    let data = getChecklistData();
    
    data[taskId] = isChecked;
    localStorage.setItem(`checklist_${todayKey}`, JSON.stringify(data));
    
    if (isChecked) {
        showToast("Alhamdulillah, semoga berkah! 🌿");
    }
    
    // Render ulang agar warna card berubah
    renderChecklist();
}

// Panggil fungsi saat aplikasi dimuat
document.addEventListener('DOMContentLoaded', renderChecklist);
