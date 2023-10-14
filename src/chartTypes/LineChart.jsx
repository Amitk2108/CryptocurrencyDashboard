import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
const opts = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    elements: {
      point: {
        display: false,
        backgroundColor: "white",
        hoverBackgroundColor: "white",
      },
    },
  },

  scales: {
    x: {
      ticks: {
        color: "rgba(162,102,246)",
      },
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "Days",
        color: "rgba(162,102,246)",
      },
    },
    y: {
      ticks: {
        color: "rgba(162,102,246)",
      },
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      title: {
        display: true,
        text: "Price",
        color: "rgba(162,102,246)",
      },
    },
  },
};

const LineChart = ({ chartData }) => {
  const chartRef = useRef();
  const coin = useSelector((state) => state.chart.coin);

  function generateGradient() {
    let gradient = chartRef.current.ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(162, 102, 246, 1)");
    gradient.addColorStop(0.5, "rgba(203, 159, 249, 1)");
    gradient.addColorStop(1, "rgba(203, 159, 249, 1)");
    return gradient;
  }

  const [UserData, setUserData] = useState({
    labels: chartData?.prices?.map((d) => new Date().toLocaleDateString(d[0])),
    datasets: [
      {
        label: `${coin.id}`,
        data: chartData?.prices?.map((d) => d[1]),
      },
    ],
  });

  useEffect(() => {
    setUserData({
      labels: chartData?.prices?.map((d) =>
        new Date(d[0]).toLocaleDateString("en-US", {
          day: "numeric",
          month: "numeric",
          // year: "numeric",
        })
      ),
      datasets: [
        {
          label: `${coin.id}`,
          borderColor: "transparent",
          border: "none",
          fill: true,
          hitRadius: 30,
          tension: 0.4,
          backgroundColor: generateGradient(),
          data: chartData?.prices?.map((d) => d[1]),
          pointStyle: false,
          // pointRadius: 12,
          // pointHoverRadius: 10,
        },
      ],
    });
  }, [chartData]);

  return <Line ref={chartRef} data={UserData} options={opts} />;
};

export default LineChart;
