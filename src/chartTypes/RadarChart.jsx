import { Radar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const options = {
  plugins: {
    legend: {
      display: false,
      position: "right",
    },
  },
  elements: {
    line: {
      backgroundColor: "rgba(162,102,246,.8)",
      borderWidth: 1,
    },
  },
  scales: {
    r: {
      angleLines: {
        display: false,
      },
    },
  },
};

const RadarChart = ({ portfolio }) => {
  const data = {
    labels: portfolio?.map((coin) => coin.name),
    datasets: [
      {
        data: portfolio?.map((coin) => coin.amount),
        pointHitRadius: 30,
        responsive: true,
      },
    ],
  };
  return (
    <div
      style={{
        position: "relative",
        margin: "auto",
        height: "100%",
        width: "90%",
      }}
      className=" h-full w-full"
    >
      <Radar data={data} className="max-h-44" options={options} />
    </div>
  );
};

export default RadarChart;
