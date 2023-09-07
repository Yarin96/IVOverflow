import { createSlice } from "@reduxjs/toolkit";

interface Answer {
  answerBody: string;
  userAnswered: string;
  answeredOn: Date;
  userId: string;
}

interface AnswersState {
  answersList: Answer[];
  isLoading: boolean;
}

const initialState: AnswersState = {
  answersList: [],
  isLoading: true,
};

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    postAnswer: (state, action) => {
      state.answersList = action.payload;
      state.isLoading = false;
    },
  },
});

export const { postAnswer } = answerSlice.actions;
export default answerSlice.reducer;
