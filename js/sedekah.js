// Render antarmuka Tracker Sedekah
function renderSedekahApp() {
    const container = document.getElementById('sedekah-container');
    container.innerHTML = `
        <div class="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-6 rounded-2xl shadow-md mb-6 relative overflow-hidden">
            <i class="fas fa-hand-holding-heart absolute -right-4 -bottom-4 text-6xl opacity-20"></i>
            <p class="text-emerald-100 text-sm font-medium mb-1">Total Sedekah Bulan Ini</p>
            <h3 id="total-sedekah" class="text-3xl font-black tracking-wide">Rp 0</h3>
        </div>

        <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
            <h3 class="font-bold mb-4 text-slate-800 dark:text-slate-200"><i class="fas fa-plus-circle text-orange-500"></i> Catat Sedekah Baru</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-sm text-slate-500 mb-1">Nominal (Rp)</label>
                    <input type="number" id="sedekah-amount" placeholder="Cth: 50000" class="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 focus:outline-none focus:border-orange-500">
                </div>
                <div>
                    <label class="block text-sm text-slate-500 mb-1">Keterangan / Tujuan</label>
                    <input type="text" id="sedekah-note" placeholder="Cth: Kotak amal masjid" class="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 focus:outline-none focus:border-orange-500">
                </div>
                <button onclick="saveSedekah()" class="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition">
                    Simpan Sedekah
                </button>
            </div>
        </div>

        <div>
            <h3 class="font-bold mb-3"><i class="fas fa-history text-slate-400"></i> Riwayat Transaksi</h3>
            <div id="sedekah-history" class="space-y-3"></div>
        </div>
    `;
    loadSedekahHistory();
}

// Simpan data sedekah
function saveSedekah() {
    const amount = document.getElementById('sedekah-amount').value;
    const note = document.getElementById('sedekah-note').value;

    if (!amount || amount <= 0) {
        showToast("Masukkan nominal yang valid!");
        return;
    }

    const newEntry = {
        id: Date.now(),
        date: new Date().toLocaleDateString('id-ID'),
        amount: parseInt(amount),
        note: note || 'Tanpa keterangan'
    };

    let history = JSON.parse(localStorage.getItem('sedekah_history')) || [];
    history.unshift(newEntry);
    localStorage.setItem('sedekah_history', JSON.stringify(history));

    showToast("Catatan sedekah berhasil disimpan! 💰");
    
    // Reset form
    document.getElementById('sedekah-amount').value = '';
    document.getElementById('sedekah-note').value = '';
    
    loadSedekahHistory();
}

// Format Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
}

// Load riwayat dan hitung total
function loadSedekahHistory() {
    const container = document.getElementById('sedekah-history');
    const totalEl = document.getElementById('total-sedekah');
    let history = JSON.parse(localStorage.getItem('sedekah_history')) || [];

    // Hitung Total
    const totalAmount = history.reduce((sum, item) => sum + item.amount, 0);
    totalEl.innerText = formatRupiah(totalAmount);

    if (history.length === 0) {
        container.innerHTML = `<p class="text-center text-slate-400 text-sm py-4">Belum ada catatan sedekah.</p>`;
        return;
    }

    let html = '';
    history.forEach(item => {
        html += `
            <div class="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                <div>
                    <p class="font-bold text-lg text-slate-800 dark:text-slate-200">${formatRupiah(item.amount)}</p>
                    <p class="text-sm text-slate-500">${item.note} <span class="mx-2">•</span> ${item.date}</p>
                </div>
                <button onclick="deleteSedekah(${item.id})" class="text-red-400 hover:text-red-600 p-2">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Hapus sedekah
function deleteSedekah(id) {
    if (confirm("Hapus catatan sedekah ini?")) {
        let history = JSON.parse(localStorage.getItem('sedekah_history')) || [];
        history = history.filter(item => item.id !== id);
        localStorage.setItem('sedekah_history', JSON.stringify(history));
        
        showToast("Catatan dihapus");
        loadSedekahHistory();
    }
}

// Jalankan saat file diload
document.addEventListener('DOMContentLoaded', renderSedekahApp);
