import React from "react";
import { useSelector } from "react-redux";
import PorfolioList from "./PorfolioList";
import RadarChart from "../../chartTypes/RadarChart";
const Portfolio = () => {
  const portfolio = useSelector((state) => state.user.portfolio);
  return (
    <div className="grid h-full grid-rows-[auto_1fr] gap-4 rounded-xl bg-gradient2 p-4 shadow-portfolioCardShadow dark:shadow-none">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-lightPrimary ">Portfolio</h2>
        <p className=" text-lightSecondary ">Your Tokens Portfolio</p>
      </div>
      <div className="grid w-full grid-cols-1 gap-4  sm:grid-cols-2">
        <RadarChart portfolio={portfolio} />
        <PorfolioList portfolio={portfolio} />
      </div>
    </div>
  );
};

export default Portfolio;
