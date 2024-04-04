import React from "react";
import { Chart as ChartJS } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ arr = [], currency, days }) => {
  // Handle potential errors with empty data
  const prices = []; // Use arr if available, otherwise default to [0]
  const date = [];

  for (let i = 0; i < arr.length; i++) {
    if (days === "24h") {
      date.push(new Date(arr[i][0]).toLocaleTimeString());
    } else {
      date.push(new Date(arr[i][0]).toLocaleDateString());
    }
    prices.push(arr[i][1]);
  }

  const data = {
    labels: date,
    datasets: [
      {
        label: `Price in ${currency}`,
        data: prices,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Line
      options={{
        responsive: true,
      }}
      data={data}
    />
  );
};

export default Chart;
