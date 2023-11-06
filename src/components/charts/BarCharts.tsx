import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const daysOfWeek = ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];

const data = daysOfWeek.map((day, index) => ({
  id: index + 1,
  weight: Math.floor(Math.random() * 10) + 1,
  day: day,
}));

const BarCharts = () => {
  const labels = daysOfWeek;
  const weights = data.map((d) => d.weight);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Weights",
        data: weights,
        backgroundColor: "rgb(204	230	218)",
        borderColor: "rgb(204	230	218)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} />{" "}
    </div>
  );
};

export default BarCharts;
