import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base } from "../../Context/api/api";

//fetch chart data from api
export const fetchChartData = createAsyncThunk(
  "chart/fetchchartdata",
  async ({ coin, baseCurr, filter }) => {
    const response = await fetch(
      `${base}/coins/${coin}/market_chart?vs_currency=${baseCurr}&days=${filter}&interval=daily`
    );
    return await response.json();
  }
);

// fetch coin details like price ranking etc
export const fetchCoinDetails = createAsyncThunk(
  "chart/coindetails",
  async (coin) => {
    const response = await fetch(
      `${base}/coins/${coin}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
    );
    return await response.json();
  }
);

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    chartData: [],
    loading: false,
    error: "",
    coin: {}, // Coin Selected and of which chart is rendering
  },
  reducers: {
    updateCoin(state, action) {
      state.coin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChartData.fulfilled, (state, action) => {
      state.chartData = action.payload;
      state.loading = false;
    }),
      builder.addCase(fetchChartData.rejected, (state, action) => {
        state.error = action.error?.message;
        state.loading = false;
      }),
      builder.addCase(fetchChartData.pending, (state) => {
        state.loading = true;
      });

    builder.addCase(fetchCoinDetails.fulfilled, (state, action) => {
      state.coin = action.payload;
      state.loading = false;
    }),
      builder.addCase(fetchCoinDetails.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(fetchCoinDetails.pending, (state) => {
        state.loading = true;
      });
  },
});
export const { updateCoin } = chartSlice.actions;
export default chartSlice.reducer;
