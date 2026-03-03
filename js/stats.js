const statsChartEl = document.getElementById("statsChart").getContext("2d");

// Ambil data dari localStorage
function getStatsData() {
  const checklist = JSON.parse(localStorage.getItem("checklist")) || [];
  const tilawah = JSON.parse(localStorage.getItem("tilawah")) || { progress: 0 };
  const completedTasks = checklist.filter(t => t.done).length;
  return {
    labels: ['Checklist', 'Tilawah'],
    data: [completedTasks, tilawah.progress]
  };
}

const statsData = getStatsData();

const statsChart = new Chart(statsChartEl, {
  type: 'bar',
  data: {
    labels: statsData.labels,
    datasets: [{
      label: 'Progress Ibadah Hari Ini',
      data: statsData.data,
      backgroundColor: ['#3b82f6','#10b981'],
      borderRadius: 5
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true, max: Math.max(...statsData.data, 1) }
    }
  }
});
