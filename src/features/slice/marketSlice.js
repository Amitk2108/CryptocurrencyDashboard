import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const base = "https://api.coingecko.com/api/v3";


// fetch top 250 coin by marketcap
export const fetchMarket = createAsyncThunk(
  "market/fetch",
  async (baseCurr = "usd") => {
    const response = await fetch(
      `${base}/coins/markets?vs_currency=${baseCurr}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
    );
    return await response.json();
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState: {
    loading: false,
    value: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMarket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMarket.fulfilled, (state, action) => {
      (state.value = action.payload), (state.loading = false);
    });
    builder.addCase(fetchMarket.rejected, (state, action) => {
      console.log(action);
      state.error = action.error.message;
    });
  },
});

export default marketSlice.reducer;
