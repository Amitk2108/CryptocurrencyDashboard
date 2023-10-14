import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../chartTypes/BarChart";
import LineChart from "../../chartTypes/LineChart";
import ChartFilter from "./ChartFilter";
import CoinDetails from "./CoinDetails";
import axios from "axios";

const Charts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
     
      .get(
        " https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily"
      )
      .then((response) => {
        // console.log("btc", response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  console.log("coindetails", CoinDetails);
  const chartData = useSelector((state) => state.chart.chartData); // Chart data from store
  // console.log("chartdata", chartData);
  const type = useSelector((state) => state.chartFilter.type); // Type of chart user selected (bar is default)
  return (
    <div className="relative flex h-full w-full flex-col items-center gap-10  xl:flex-row">
      {chartData.prices ? (
        <>
          <CoinDetails />

          <div
            style={{
              position: "relative",
              margin: "auto",
              height: "100%",
              width: "90%",
            }}
            className="grid place-content-center overflow-hidden pt-4"
          >
            <ChartFilter />

            {/* Conditional Rendering of bar and line chart componenets  */}
            {type === "line" ? (
              <LineChart chartData={chartData} />
            ) : (
              <BarChart chartData={chartData} />
            )}
          </div>
        </>
      ) : (
        // If no coin select show this div
        <>
          <CoinDetails />
          <div
            style={{
              position: "relative",
              margin: "auto",
              height: "100%",
              width: "90%",
            }}
            className="grid place-content-center overflow-hidden pt-4"
          >
            <ChartFilter />

            {/* Conditional Rendering of bar and line chart componenets  */}
            {type === "line" ? (
              <LineChart chartData={posts} />
            ) : (
              <BarChart chartData={posts} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Charts;
