import { createSlice } from "@reduxjs/toolkit";

const loadingDataSlice = createSlice({
  name: "loading",
  initialState: {
    pageLoading:false,
  },
  reducers: {
    setPageLoading:(state, { payload }) => {
      state.pageLoading = payload;
    },
  },
});

export const { setPageLoading } = loadingDataSlice.actions;
export default loadingDataSlice.reducer;
