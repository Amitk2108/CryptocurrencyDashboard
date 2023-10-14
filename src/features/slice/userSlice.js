import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    portfolio: [
      { id: "bitcoin", name: "Bitcoin", amount: 300 },
      { id: "ethereum", name: "Ethereum", amount: 500 },
      { id: "bnb", name: "Bnb", amount: 1000 },
      { id: "tether", name: "Tether", amount: 4000 },
      { id: "ripple", name: "XRP", amount: 5000 },
    ],
  },
  reducers: {
    withdrew(state, action) {
      const { sell } = action.payload;
      const withdrewAmount = action.payload.amount;
      // find coin in coins
      const coinIndex = state.portfolio.findIndex(
        (item) => item.id === sell.id
      );
      if (coinIndex > -1) {
        const existingCoin = state.portfolio[coinIndex];
        if (existingCoin.amount > Number(withdrewAmount)) {
          existingCoin.amount = existingCoin.amount - Number(withdrewAmount);
        }
      }
    },
    deposit(state, action) {
      const { buy, depositedAmount } = action.payload;
      const dpAmount = Number(depositedAmount);
      //Find if coin already exist and update its value by the amount (new amount deposited)
      const index = state.portfolio.findIndex((coin) => coin.id === buy.id);

      //if coin exist
      if (index > -1) {
        const existingCoin = state.portfolio[index];
        existingCoin.amount += dpAmount;
      }
      //Coin dosnt exist in user portfolio
      else {
        state.portfolio.push({
          id: buy.id,
          name: buy.name,
          amount: dpAmount,
        });
      }
    },
  },
});
export const { withdrew, deposit } = userSlice.actions;
export default userSlice.reducer;
