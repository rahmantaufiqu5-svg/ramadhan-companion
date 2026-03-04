// --- SISTEM NAVIGASI (TAB) ---
function switchView(viewId) {
    // Sembunyikan semua section
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.add('hidden');
    });
    // Tampilkan section yang dipilih
    document.getElementById(viewId).classList.remove('hidden');

    // Update warna tombol navigasi bawah
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-ramadhan', 'dark:text-emerald-400');
        btn.classList.add('text-slate-400');
    });
    // Jika tombol ditekan dari navigasi bawah, ubah warnanya
    const activeBtn = event.currentTarget;
    if (activeBtn.classList.contains('nav-btn')) {
        activeBtn.classList.remove('text-slate-400');
        activeBtn.classList.add('text-ramadhan', 'dark:text-emerald-400');
    }
}

// --- SISTEM NOTIFIKASI (TOAST) ---
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    // Hapus toast setelah 3 detik
    setTimeout(() => {
        toast.classList.add('hide');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
}

// --- JADWAL SHOLAT & COUNTDOWN ---
let prayerTimesData = null;

async function initPrayerTimes() {
    const locationText = document.getElementById('location-text');
    const dateText = document.getElementById('current-date');
    
    // Tampilkan tanggal hari ini
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateText.textContent = today.toLocaleDateString('id-ID', options);

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            try {
                // Ambil data dari Aladhan API (Metode 11 = Kemenag RI)
                const response = await fetch(`https://api.aladhan.com/v1/timings/${Math.floor(Date.now() / 1000)}?latitude=${lat}&longitude=${lng}&method=11`);
                const data = await response.json();
                
                prayerTimesData = data.data.timings;
                locationText.innerHTML = `<i class="fas fa-location-dot"></i> Lokasi Ditemukan`;
                
                renderPrayerTimes(prayerTimesData);
                setInterval(updateCountdown, 1000); // Mulai hitung mundur
                
            } catch (error) {
                locationText.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Gagal memuat jadwal`;
                showToast("Gagal mengambil jadwal sholat. Periksa koneksi internet.");
            }
        }, (error) => {
            locationText.innerHTML = `<i class="fas fa-location-crosshairs"></i> Akses lokasi ditolak`;
            showToast("Izinkan akses lokasi untuk jadwal akurat.");
        });
    } else {
        locationText.innerHTML = "Geolokasi tidak didukung";
    }
}

function renderPrayerTimes(timings) {
    const grid = document.getElementById('prayer-times-grid');
    const prayers = ['Imsak', 'Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const idNames = ['Imsak', 'Fajr', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];
    
    let html = '';
    prayers.forEach((prayer, index) => {
        html += `
            <div class="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <p class="text-[10px] text-slate-400 uppercase tracking-wider mb-1">${idNames[index]}</p>
                <p class="font-bold text-sm text-ramadhan dark:text-emerald-400">${timings[prayer]}</p>
            </div>
        `;
    });
    grid.innerHTML = html;
}

function updateCountdown() {
    if (!prayerTimesData) return;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    // Parse waktu Maghrib dan Imsak ke dalam menit
    const maghribParts = prayerTimesData.Maghrib.split(':');
    const maghribTime = parseInt(maghribParts[0]) * 60 + parseInt(maghribParts[1]);
    
    const imsakParts = prayerTimesData.Imsak.split(':');
    const imsakTime = parseInt(imsakParts[0]) * 60 + parseInt(imsakParts[1]);

    let targetTime = 0;
    let label = '';

    // Logika penentuan hitung mundur (Maghrib atau Imsak)
    if (currentTime < imsakTime) {
        targetTime = imsakTime;
        label = 'Menuju Imsak';
    } else if (currentTime < maghribTime) {
        targetTime = maghribTime;
        label = 'Menuju Buka Puasa';
    } else {
        // Jika sudah lewat Maghrib, hitung mundur ke Imsak besoknya
        targetTime = imsakTime + (24 * 60); 
        label = 'Menuju Imsak Esok Hari';
    }

    document.getElementById('countdown-label').textContent = label;

    // Hitung selisih detik
    let targetDate = new Date();
    targetDate.setHours(Math.floor(targetTime / 60), targetTime % 60, 0, 0);
    
    let diff = Math.floor((targetDate - now) / 1000);
    if (diff < 0) diff = 0; // Cegah minus

    const h = Math.floor(diff / 3600).toString().padStart(2, '0');
    const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(diff % 60).toString().padStart(2, '0');

    document.getElementById('countdown-timer').textContent = `${h}:${m}:${s}`;
}

// Jalankan inisialisasi saat file diload
document.addEventListener('DOMContentLoaded', initPrayerTimes);
