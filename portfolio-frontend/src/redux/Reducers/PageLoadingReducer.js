import { createSlice } from "@reduxjs/toolkit";

const loadingDataSlice = createSlice({
  name: "loading",
  initialState: {
    pageLoading:true
  },
  reducers: {
    setPageLoading:(state, { payload }) => {
      state.pageLoading = payload;
    },
  },
});

export const { setPageLoading } = loadingDataSlice.actions;
export default loadingDataSlice.reducer;
