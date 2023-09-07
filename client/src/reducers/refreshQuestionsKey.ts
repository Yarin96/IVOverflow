import { createSlice } from "@reduxjs/toolkit";

const refreshQuestionsKeySlice = createSlice({
  name: "refreshKey",
  initialState: 0,
  reducers: {
    incrementRefreshKey: (state) => {
      return state + 1;
    },
  },
});

export const { incrementRefreshKey } = refreshQuestionsKeySlice.actions;

export default refreshQuestionsKeySlice.reducer;
