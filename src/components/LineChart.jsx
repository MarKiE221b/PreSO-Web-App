import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ fetchedData }) => {
  console.log(fetchedData);
  // Chart data
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: `S.O. Received ${
          fetchedData?.data ? fetchedData?.data.year : ""
        }`,
        data: fetchedData?.data ? fetchedData.data.monthlyCounts : [],
        borderColor: "#4CAF50", // Tailwind green
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        pointBackgroundColor: "#4CAF50",
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#374151", // Tailwind slate-700
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#374151", // Tailwind slate-700
        },
        grid: {
          color: "#E5E7EB", // Tailwind gray-200
        },
      },
      y: {
        ticks: {
          color: "#374151", // Tailwind slate-700
        },
        grid: {
          color: "#E5E7EB", // Tailwind gray-200
        },
      },
    },
  };

  return (
    <div className="p-4 bg-base-100 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-center mb-4">
        Monthly Received SO
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
