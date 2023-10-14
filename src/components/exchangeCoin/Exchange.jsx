import React from "react";
import { useEffect } from "react";
import { base } from "../../Context/api/api";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateamount,
  updateBuy,
  updateBuyPrice,
  updateSell,
  updateSellPrice,
} from "../../features/slice/exchangeSlice";
import ComboxBox from "../ui/ComboBox";
import Modal from "../ui/Modal";
import { useState } from "react";
import { error, success } from "../../utils/toast";
const Exchange = () => {
  let [isOpen, setIsOpen] = useState(false);
  const portfolio = useSelector((state) => state.user.portfolio);
  const coins = useSelector((state) => state.market.value); // Option coins
  const buy = useSelector((state) => state.exchange.buy); //Coin User buying
  const sell = useSelector((state) => state.exchange.sell); // Coin User selling
  const amount = useSelector((state) => state.exchange.amount); // Amount to be exchanged
  const [exchangedamount, setexchangedamount] = useState(0);
  const buyPrice = useSelector((state) => state.exchange.buyPrice);
  const sellPrice = useSelector((state) => state.exchange.sellPrice);

  const dispatch = useDispatch();

  //Fetching coin data (exchange rate in usd)
  async function fetchCurrentPrice(coin) {
    const response = await fetch(
      `${base}/coins/${coin.id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return await response.json();
  }

  //Get Current Price of the Coins if both are selected by user
  async function getCurrentPrice() {
    if (buy.id && sell.id) {
      dispatch(updateBuyPrice(await fetchCurrentPrice(buy)));
      dispatch(updateSellPrice(await fetchCurrentPrice(sell)));
    }
  }

  //Check balance and open modal to confirm transaction
  function validateBalance() {
    //Check weather user selected coins or not
    if (!buy.id || !sell.id) {
      return toast("Select Coins", error);
    }

    //Check weather user have selling coin and amount above the limit
    const coinExist = portfolio.find((coin) => coin.id === sell.id);
    if (!coinExist) {
      return toast(`You dont have ${sell.name}`, error);
    } else if (coinExist?.amount > amount && amount > 0) {
      setIsOpen(true);
    } else if (coinExist?.amount <= amount) {
      toast("Insufficient balance", error);
    }
  }

  //Convert the amount in buying Coin and display on screen and also update exchange amount
  function handleCurrencyConvert() {
    const result =
      (sellPrice?.market_data?.current_price?.usd * amount) /
      buyPrice?.market_data?.current_price?.usd;
    setexchangedamount(result.toFixed(5));
  }

  //Run everytime if user input changes (sell amount)
  useEffect(() => {
    handleCurrencyConvert();
  }, [amount]);

  useEffect(() => {
    dispatch(updateamount(""));
    getCurrentPrice();
  }, [buy, sell]);

  return (
    <div className="grid h-full gap-4 rounded-xl bg-gradient1 px-4 py-4 shadow-exchangeCardShadow dark:shadow-none">
      <p className="text-3xl font-semibold text-DarkPrimary">Exchange Coins</p>
      <Modal
        isModalOpen={isOpen}
        update={setIsOpen}
        portfolio={portfolio}
        exchangedamount={exchangedamount}
        amount={amount}
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Buy Sell Button  */}
        <div className="grid grid-cols-1 grid-rows-2 items-end gap-6">
          <div className=" grid w-full grid-cols-[auto_1fr] items-center gap-4">
            <p className="font-medium text-DarkPrimary">Buy</p>
            <div className=" w-full">
              <ComboxBox data={coins} coin={buy} update={updateBuy} />
            </div>
          </div>
          <div className=" flex items-center gap-4">
            <p className=" font-medium text-DarkPrimary">Sell</p>
            <ComboxBox data={coins} coin={sell} update={updateSell} />
          </div>
        </div>
        {/* Input  */}
        <div className="grid grid-cols-1 grid-rows-2 items-end">
          {exchangedamount > 0 ? (
            <div className=" relative flex h-full items-center justify-end gap-2 pt-4 text-DarkPrimary sm:pt-0 ">
              <span className=" absolute top-[-.8rem] left-2 rounded-full px-2 py-1 text-[12px] uppercase">
                You will get :
              </span>
              <p className=" text-center text-2xl font-bold">
                {exchangedamount}
              </p>
              <p className="uppercase"> {buy?.symbol}</p>
            </div>
          ) : (
            <p className="m-auto  text-center text-base text-DarkPrimary">
              Enter Value
            </p>
          )}
          <div className=" relative">
            <input
              type="number"
              className="h-fit w-full min-w-[128px] rounded-full border-none bg-light py-3 px-6 pr-10 text-base font-medium leading-5 text-lightPrimary shadow-md placeholder:text-lightSecondary focus:outline-none"
              placeholder="eg. 0.1xx"
              value={amount}
              onChange={(e) => dispatch(updateamount(Number(e.target.value)))}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="absolute top-3 right-3 w-5 stroke-accent"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <button
        disabled={!(amount > 0)}
        className="mx-auto h-fit  rounded-full bg-accent px-4 py-2 font-semibold text-white hover:bg-accent/80 disabled:bg-transparent"
        onClick={validateBalance}
      >
        Exchange
      </button>
    </div>
  );
};

export default Exchange;
