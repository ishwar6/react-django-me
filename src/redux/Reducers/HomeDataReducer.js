import { createSlice } from "@reduxjs/toolkit";

const homeDataSlice = createSlice({
  name: "homeData",
  initialState: {
    homeData: null,
  },
  reducers: {
    setHomePageData: (state, { payload }) => {
      state.homeData = payload;
    },
  },
});

export const { setHomePageData } = homeDataSlice.actions;
export default homeDataSlice.reducer;
