function renderBackupApp() {
    const container = document.getElementById('backup-container');
    container.innerHTML = `
        <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-6">
            
            <div class="text-center">
                <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                    <i class="fas fa-cloud-download-alt"></i>
                </div>
                <h3 class="font-bold text-lg mb-1">Backup Data</h3>
                <p class="text-xs text-slate-500 mb-4">Simpan seluruh riwayat ibadah kamu ke dalam file aman agar tidak hilang.</p>
                <button onclick="exportData()" class="w-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition">
                    <i class="fas fa-file-export mr-2"></i> Ekspor Data (.json)
                </button>
            </div>

            <hr class="border-slate-200 dark:border-slate-700">

            <div class="text-center">
                <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                    <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <h3 class="font-bold text-lg mb-1">Pulihkan Data</h3>
                <p class="text-xs text-slate-500 mb-4">Punya file backup dari HP lama? Unggah ke sini untuk mengembalikan datamu.</p>
                
                <input type="file" id="import-file" accept=".json" class="hidden" onchange="importData(event)">
                
                <button onclick="document.getElementById('import-file').click()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
                    <i class="fas fa-file-import mr-2"></i> Impor Data Backup
                </button>
            </div>

            <div class="mt-8 pt-4 border-t border-red-200 dark:border-red-900/50">
                <button onclick="resetAllData()" class="w-full text-red-500 hover:text-red-700 font-medium text-sm py-2">
                    <i class="fas fa-exclamation-triangle mr-1"></i> Hapus Seluruh Data Aplikasi
                </button>
            </div>

        </div>
    `;
}

// Fungsi EKSPOR: Mengambil semua data LocalStorage dan mendownloadnya
function exportData() {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `Backup_Ramadhan_${new Date().toLocaleDateString('id-ID')}.json`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Data berhasil diekspor! 📁");
}

// Fungsi IMPOR: Membaca file JSON dan memasukkannya ke LocalStorage
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Bersihkan storage lama, ganti dengan yang baru
            localStorage.clear();
            for (let key in data) {
                localStorage.setItem(key, data[key]);
            }
            
            alert("Data berhasil dipulihkan! Aplikasi akan dimuat ulang.");
            location.reload(); // Muat ulang halaman agar perubahan terlihat
        } catch (error) {
            alert("File tidak valid atau rusak!");
        }
    };
    reader.readAsText(file);
}

// Fungsi RESET: Menghapus semua data (Danger Zone)
function resetAllData() {
    if (confirm("PERINGATAN! Semua riwayat ibadah akan dihapus secara permanen. Anda yakin?")) {
        localStorage.clear();
        alert("Semua data telah direset.");
        location.reload();
    }
}

// Jalankan saat file diload
document.addEventListener('DOMContentLoaded', renderBackupApp);
