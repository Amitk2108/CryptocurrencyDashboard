import Charts from "../components/chart/Charts";
import Exchange from "../components/exchangeCoin/Exchange";
import Market from "../components/marketCoin/Market";
import Search from "../components/searchBar/Search";
import Portfolio from "../components/portfolio/Portfolio";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <div className="gridContainer bg-lightGradient transition-all duration-200 ease-in-out dark:bg-darkGradient">
      <Toaster />
      <div className="searchbar z-20 mt-10 flex items-center justify-center md:mt-0 ">
        <Search />
      </div>
      <div className="marketcap">
        <Market />
      </div>
      <div className="chart">
        <Charts />
      </div>
      <div className="portfolio">
        <Portfolio />
      </div>
      <div className="exchange mb-10 md:mb-0">
        <Exchange />
      </div>
    </div>
  );
};

export default Home;
