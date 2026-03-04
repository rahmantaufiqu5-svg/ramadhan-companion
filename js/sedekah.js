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
                    <input type="text" id="sedekah-note" placeholder="Cth: Kotak amal masjid" class="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-70
