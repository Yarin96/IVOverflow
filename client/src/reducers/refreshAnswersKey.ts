import { createSlice } from "@reduxjs/toolkit";

const refreshAnswersKeySlice = createSlice({
  name: "refreshKey",
  initialState: 0,
  reducers: {
    incrementRefreshKey: (state) => {
      return state + 1;
    },
  },
});

export const { incrementRefreshKey } = refreshAnswersKeySlice.actions;

export default refreshAnswersKeySlice.reducer;
