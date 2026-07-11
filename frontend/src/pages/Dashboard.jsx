import { useEffect, useRef } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { Chart, 
         ArcElement,
         BarElement,
         CategoryScale,
         LinearScale,
         Tooltip,
         Legend,
         PieController,
         BarController} from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, PieController, BarController);

export default function Dashboard() {
  const { tasks, loading } = useTasks();
  const pieRef = useRef(null);
  const barRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const done = tasks.filter(t => t.status === 'done').length;
  const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

  const highPriority = tasks.filter(t => t.priority === 'alta').length;
  const mediumPriority = tasks.filter(t => t.priority === 'media').length;
  const lowPriority = tasks.filter(t => t.priority === 'baixa').length;

  useEffect(() => {
    if (pieChartRef.current) pieChartRef.current.destroy();
    if (barChartRef.current) barChartRef.current.destroy();

    if (pieRef.current) {
      pieChartRef.current = new Chart(pieRef.current, {
        type: 'pie',
        data: {
          labels: ['Pendente', 'Em andamento', 'Concluído'],
          datasets: [{
            data: [pending, inProgress, done],
            backgroundColor: ['#d29922', '#58a6ff', '#238636'],
            borderColor: ['#d29922', '#58a6ff', '#238636'],
            borderWidth: 1,
          }],
        },
        options: {
          plugins: {
            legend: {
              labels: { color: '#c9d1d9' },
            },
          },
        },
      });
    }

    if (barRef.current) {
      barChartRef.current = new Chart(barRef.current, {
        type: 'bar',
        data: {
          labels: ['Alta', 'Média', 'Baixa'],
          datasets: [{
            label: 'Tarefas por prioridade',
            data: [highPriority, mediumPriority, lowPriority],
            backgroundColor: ['#da3633', '#d29922', '#238636'],
            borderColor: ['#da3633', '#d29922', '#238636'],
            borderWidth: 1,
          }],
        },
        options: {
          plugins: {
            legend: {
              labels: { color: '#c9d1d9' },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#c9d1d9', stepSize: 1 },
              grid: { color: '#30363d' },
            },
            x: {
              ticks: { color: '#c9d1d9' },
              grid: { color: '#30363d' },
            },
          },
        },
      });
    }

    return () => {
      if (pieChartRef.current) pieChartRef.current.destroy();
      if (barChartRef.current) barChartRef.current.destroy();
    };
  }, [tasks]);

  if (loading) {
    return <div className="loading">Carregando métricas...</div>;
  }

  return (
    <div className="dashboard">
      <div className="metrics-cards">
        <div className="metric-card">
          <div className="metric-value">{total}</div>
          <div className="metric-label">Total de tarefas</div>
        </div>
        <div className="metric-card">
          <div className="metric-value" style={{ color: '#d29922' }}>
            {pending}
          </div>
          <div className="metric-label">Pendentes</div>
        </div>
        <div className="metric-card">
          <div className="metric-value" style={{ color: '#58a6ff' }}>
            {inProgress}
          </div>
          <div className="metric-label">Em andamento</div>
        </div>
        <div className="metric-card">
          <div className="metric-value" style={{ color: '#238636' }}>
            {done}
          </div>
          <div className="metric-label">Concluídas</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{completionRate}%</div>
          <div className="metric-label">Taxa de conclusão</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Status das Tarefas</h3>
          <canvas ref={pieRef}></canvas>
        </div>
        <div className="chart-container">
          <h3>Prioridade</h3>
          <canvas ref={barRef}></canvas>
        </div>
      </div>
    </div>
  );
}