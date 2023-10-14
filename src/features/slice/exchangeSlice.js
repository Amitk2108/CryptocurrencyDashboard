import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base } from "../../Context/api/api";

//fetch coin current ptice
export const fetchCurrentPrice = createAsyncThunk(
  "exchange/fetchcurrentprice",
  async (coin) => {
    const response = await fetch(
      `${base}/${coin.id}/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    return await response.json();
  }
);

const exchangeSlice = createSlice({
  name: "exchange",
  initialState: {
    buy: {},
    sell: {},
    buyPrice: 0,
    sellPrice: 0,
    amount: 0,
  },
  reducers: {
    updateBuy(state, action) {
      state.buy = action.payload;
    },
    updateSell(state, action) {
      state.sell = action.payload;
    },
    updateBuyPrice(state, action) {
      state.buyPrice = action.payload;
    },
    updateSellPrice(state, action) {
      state.sellPrice = action.payload;
    },
    updateamount(state, action) {
      state.amount = action.payload;
    },
  },
});

export const {
  updateBuy,
  updateSell,
  updateSellPrice,
  updateBuyPrice,
  updateamount,
} = exchangeSlice.actions;
export default exchangeSlice.reducer;
