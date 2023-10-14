import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base } from "../../Context/api/api";

//search coin in search box
export const fetchBestMatches = createAsyncThunk(
  "search/bestmatches",
  async (coin) => {
    const response = await fetch(`${base}/search?query=${coin}`);
    return await response.json();
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    //Searching dropdown
    bestMatches: [], // Fetch best match depending on the search input
    loading: false, // you may use it in ui
    error: "", // if any error occur
    baseCurrency: "usd", // Initially usd is base currency (and data sidebar will fetch usd data)
  },
  reducers: {
    updateBaseCurrency(state, action) {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBestMatches.fulfilled, (state, action) => {
      state.bestMatches = action.payload;
      state.loading = false;
    }),
      builder.addCase(fetchBestMatches.pending, (state) => {
        state.loading = true;
      }),
      builder.addCase(fetchBestMatches.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
export const { updateBaseCurrency } = searchSlice.actions;
export default searchSlice.reducer;
