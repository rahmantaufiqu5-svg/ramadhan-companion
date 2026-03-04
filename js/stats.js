let myChart = null;

// Fungsi untuk mendapatkan 7 hari terakhir
function getLast7Days() {
    const dates = [];
    const labels = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        // Format kunci (key) sesuai dengan checklist.js
        const keyDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        // Format label untuk sumbu X di grafik (contoh: "12 Mar")
        const labelDate = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
        
        dates.push(keyDate);
        labels.push(labelDate);
    }
    return { dates, labels };
}

// Fungsi untuk menghitung progres dari LocalStorage
function getChartData(dates) {
    const dataPoints = [];
    dates.forEach(dateKey => {
        const savedData = localStorage.getItem(`checklist_${dateKey}`);
        let completed = 0;
        if (savedData) {
            const parsed = JSON.parse(savedData);
            // Hitung berapa checklist yang bernilai "true"
            completed = Object.values(parsed).filter(val => val === true).length;
        }
        dataPoints.push(completed);
    });
    return dataPoints;
}

// Render Grafik menggunakan Chart.js
function renderStats() {
    const ctx = document.getElementById('chart-container');
    if (!ctx) return;

    const { dates, labels } = getLast7Days();
    const dataPoints = getChartData(dates);

    // Hancurkan grafik lama jika ada (mencegah bug tumpuk saat pindah tab)
    if (myChart) {
        myChart.destroy();
    }

    // Deteksi warna berdasarkan tema (Dark/Light Mode)
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#cbd5e1' : '#475569'; 
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Ibadah Selesai',
                data: dataPoints,
                backgroundColor: '#10b981', // emerald-500
                borderRadius: 6,
                barThickness: 24
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 7, // Maksimal jumlah task di checklist (ada 7 task)
                    ticks: { color: textColor, stepSize: 1 },
                    grid: { color: gridColor }
                },
                x: {
                    ticks: { color: textColor },
                    grid: { display: false }
                }
            }
        }
    });
}

// Tambahkan event listener agar grafik diperbarui saat tab "Statistik" diklik
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Beri sedikit delay agar transisi tab selesai sebelum merender grafik
