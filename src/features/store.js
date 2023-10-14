import { configureStore } from "@reduxjs/toolkit";
import chartFilterSlice from "./slice/chartFilterSlice";
import chartSlice from "./slice/chartSlice";
import exchangeSlice from "./slice/exchangeSlice";
import marketSlice from "./slice/marketSlice";
import searchSlice from "./slice/searchSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    market: marketSlice,
    search: searchSlice,
    chart: chartSlice,
    chartFilter: chartFilterSlice,
    user: userSlice,
    exchange: exchangeSlice,
  },
});
