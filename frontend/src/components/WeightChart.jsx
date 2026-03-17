import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeightChart = ({ workouts }) => {
  if (!workouts.length) return null;

  const filteredWorkouts = workouts.filter((w) => w.bodyWeight !== undefined && w.bodyWeight !== null && w.bodyWeight !== 0);
  const sortedWorkouts = filteredWorkouts.sort((a, b) => new Date(a.date) - new Date(b.date));
  const lastWorkouts = sortedWorkouts.slice(-10);
  // Labels: use dates or weekday abbreviations
  const labels = lastWorkouts.map((w) => new Date(w.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }));

  // Data points
  const dataPoints = lastWorkouts.map((w) => w.bodyWeight);

  // Determine min/max for y-axis so it looks good like your static page
  const minY = Math.floor(Math.min(...dataPoints) - 0.5); // a bit lower
  const maxY = Math.ceil(Math.max(...dataPoints) + 0.5); // a bit higher

  const data = {
    labels,
    datasets: [
      {
        label: "Weight (kg)",
        data: dataPoints,
        borderColor: "#e74c3c", // line in red
        backgroundColor: "rgba(231,76,60,0.2)", // subtle red fill
        pointBackgroundColor: "#d35400", // orange points
        tension: 0.3,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: false,
        min: minY,
        max: maxY,
        ticks: { stepSize: 0.5, color: "#fff" },
      },
      x: { ticks: { color: "#fff" } },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Line data={data} options={options} height={120} />;
};

export default WeightChart;
