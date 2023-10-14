import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchChartData,
  fetchCoinDetails,
  updateCoin,
} from "../../features/slice/chartSlice";

const SearchResult = ({ data, clearInput }) => {
  const dispatch = useDispatch();
  const baseCurr = useSelector((state) => state.search.baseCurrency);
  const filter = useSelector((state) => state.chartFilter.filter);

  //Search list selection if any coin selected it will update chart coin and data
  function handleSearchClick(coin) {
    clearInput();
    dispatch(updateCoin(coin));
    dispatch(fetchCoinDetails(coin.id));
    dispatch(fetchChartData({ coin: coin.id, baseCurr, filter }));
  }
  return (
    <div className=" custom-scroll dark:bg-darkSecondary absolute top-20 right-0 flex max-h-[400px] w-full flex-col gap-2 overflow-x-hidden overflow-y-scroll rounded-xl bg-light py-4  px-4 dark:bg-dark">
      {data.coins?.map((coin) => {
        const { id, name, thumb, market_cap_rank } = coin;
        return (
          <div
            className=" relative grid cursor-pointer grid-cols-[auto_1fr] items-center gap-4  py-4 px-10 text-lightPrimary duration-300 ease-in-out hover:bg-accent/70 hover:text-white dark:text-DarkPrimary"
            key={id}
            onClick={() => handleSearchClick(coin)}
          >
            <img src={thumb} alt={name} />
            <p className=" justify-self-end  line-clamp-1">{name}</p>
            {market_cap_rank ? (
              <p className=" absolute top-0 left-0 rounded-br-full bg-accent py-1 px-2 pr-4 text-xs text-white">
                {market_cap_rank}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResult;
