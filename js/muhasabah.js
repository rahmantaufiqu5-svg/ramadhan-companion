// Render antarmuka Muhasabah
function renderMuhasabahApp() {
    const container = document.getElementById('muhasabah-container');
    container.innerHTML = `
        <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
            <h3 class="font-bold mb-4 text-purple-600 dark:text-purple-400"><i class="fas fa-pen-fancy"></i> Tulis Jurnal Hari Ini</h3>
            <div class="space-y-4">
                <textarea id="muhasabah-text" rows="4" placeholder="Apa yang kamu syukuri hari ini? Apa yang ingin diperbaiki besok?" class="w-full p-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 focus:outline-none focus:border-purple-500 resize-none"></textarea>
                
                <button onclick="saveMuhasabah()" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition">
                    Simpan Jurnal
                </button>
            </div>
        </div>

        <div>
            <h3 class="font-bold mb-3"><i class="fas fa-book-open text-slate-400"></i> Catatan Sebelumnya</h3>
            <div id="muhasabah-history" class="space-y-4"></div>
        </div>
    `;
    loadMuhasabahHistory();
}

// Simpan data muhasabah
function saveMuhasabah() {
    const text = document.getElementById('muhasabah-text').value;

    if (!text.trim()) {
        showToast("Jurnal tidak boleh kosong!");
        return;
    }

    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        text: text
    };

    let history = JSON.parse(localStorage.getItem('muhasabah_history')) || [];
    history.unshift(newEntry);
    localStorage.setItem('muhasabah_history', JSON.stringify(history));

    showToast("Jurnal berhasil disimpan! ✍️");
    
    // Reset form
    document.getElementById('muhasabah-text').value = '';
    
    loadMuhasabahHistory();
}

// Load riwayat jurnal
function loadMuhasabahHistory() {
    const container = document.getElementById('muhasabah-history');
    let history = JSON.parse(localStorage.getItem('muhasabah_history')) || [];

    if (history.length === 0) {
        container.innerHTML = `<p class="text-center text-slate-400 text-sm py-4">Belum ada catatan muhasabah.</p>`;
        return;
    }

    let html = '';
    history.forEach(item => {
        html += `
            <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 relative">
                <p class="text-xs text-slate-400 mb-2 font-medium"><i class="far fa-calendar-alt"></i> ${item.date}</p>
                <p class="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">${item.text}</p>
                <button onclick="deleteMuhasabah(${item.id})" class="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Hapus jurnal
function deleteMuhasabah(id) {
    if (confirm("Hapus jurnal ini?")) {
        let history = JSON.parse(localStorage.getItem('muhasabah_history')) || [];
        history = history.filter(item => item.id !== id);
        localStorage.setItem('muhasabah_history', JSON.stringify(history));
        
        showToast("Jurnal dihapus");
        loadMuhasabahHistory();
    }
}

// Jalankan saat file diload
document.addEventListener('DOMContentLoaded', renderMuhasabahApp);, 
