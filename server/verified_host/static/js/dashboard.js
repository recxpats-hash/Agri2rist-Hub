async function refreshDashboard(){
  try{
    const res = await fetch('/api/dashboard');
    const json = await res.json();
    document.getElementById('total-students').textContent = json.total_students;
    document.getElementById('total-trainers').textContent = json.total_trainers;
    document.getElementById('active-courses').textContent = json.active_courses;
    document.getElementById('certificates').textContent = json.certificates;
    document.getElementById('pending-payments').textContent = json.pending_payments;
    document.getElementById('upcoming-classes').textContent = json.upcoming_classes;

    // simple revenue chart
    const ctx = document.getElementById('revenueChart');
    if (ctx){
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Revenue'],
          datasets: [{ label: 'Revenue (UGX)', data: [json.revenue], backgroundColor: ['#16A34A'] }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      });
    }
  }catch(e){ console.error(e); }
}

window.addEventListener('load', ()=>{ refreshDashboard(); });
