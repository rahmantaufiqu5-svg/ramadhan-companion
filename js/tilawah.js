// Render antarmuka Tracker Tilawah
function renderTilawahApp() {
    const container = document.getElementById('tilawah-container');
    container.innerHTML = `
        <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
            <h3 class="font-bold mb-4 text-ramadhan dark:text-emerald-400"><i class="fas fa-plus-circle"></i> Catat Bacaan Baru</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm text-slate-500 mb-1">Nama Surah</label>
                    <input type="text" id="tilawah-surah" placeholder="Cth: Al-Baqarah" class="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 focus:outline-none focus:border-ramadhan">
                </div>
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label class="block text-sm text-slate-500 mb-1">Dari Ayat</label>
                        <input type="number" id="tilawah-start" placeholder="1" class="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 focus:outline-none focus:border-ramadhan">
                    </div>
                    <div class="flex-1">
                        <label class="block text-sm text-slate-500 mb-1">Sampai Ayat</label>
                        <input type="number" id="tilawah-end" placeholder="5" class="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 focus:outline-none focus:border-ramadhan">
                    </div>
                </div>
                <button onclick="saveTilawah()" class="w-full bg-ramadhan hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition">
                    Simpan Catatan
                </button>
            </div>
        </div>

        <div>
            <h3 class="font-bold mb-3"><i class="fas fa-history"></i> Riwayat Bacaan</h3>
            <div id="tilawah-history" class="space-y-3">
                </div>
        </div>
    `;
    loadTilawahHistory();
}

// Simpan data tilawah
function saveTilawah() {
    const surah = document.getElementById('tilawah-surah').value;
    const start = document.getElementById('tilawah-start').value;
    const end = document.getElementById('tilawah-end').value;

    if (!surah || !start || !end) {
        showToast("Mohon isi semua kolom!");
        return;
    }

    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('id-ID'),
        surah: surah,
        ayat: `${start} - ${end}`
    };

    let history = JSON.parse(localStorage.getItem('tilawah_history')) || [];
    history.unshift(newEntry); // Masukkan ke urutan paling atas
    localStorage.setItem('tilawah_history', JSON.stringify(history));

    showToast("Catatan tilawah berhasil disimpan! 📖");
    
    // Reset form
    document.getElementById('tilawah-surah').value = '';
    document.getElementById('tilawah-start').value = '';
    document.getElementById('tilawah-end').value = '';
    
    loadTilawahHistory();
}

// Tampilkan riwayat
function loadTilawahHistory() {
    const container = document.getElementById('tilawah-history');
    let history = JSON.parse(localStorage.getItem('tilawah_history')) || [];

    if (history.length === 0) {
        container.innerHTML = `<p class="text-center text-slate-400 text-sm py-4">Belum ada riwayat bacaan. Mari mulai mengaji!</p>`;
        return;
    }

    let html = '';
    history.forEach(item => {
        html += `
            <div class="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                <div>
                    <p class="font-bold text-lg">${item.surah}</p>
                    <p class="text-sm text-slate-500">Ayat ${item.ayat} <span class="mx-2">•</span> <i class="far fa-clock"></i> ${item.date}</p>
                </div>
                <button onclick="deleteTilawah(${item.id})" class="text-red-400 hover:text-red-600 p-2">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Hapus riwayat tilawah
function deleteTilawah(id) {
    if (confirm("Hapus catatan ini?")) {
        let history = JSON.parse(localStorage.getItem('tilawah_history')) || [];
        history = history.filter(item => item.id !== id);
        localStorage.setItem('tilawah_history', JSON.stringify(history));
        
        showToast("Catatan dihapus");
        loadTilawahHistory();
    }
}

// Panggil fungsi saat aplikasi dimuat
document.addEventListener('DOMContentLoaded', renderTilawahApp);
