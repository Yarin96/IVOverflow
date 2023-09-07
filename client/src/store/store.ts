import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../reducers/questionSlice";
import answerReducer from "../reducers/answerSlice";
import refreshQuestionsKeyReducer from "../reducers/refreshQuestionsKey";
import refreshAnswersKeyReducer from "../reducers/refreshAnswersKey";

export const store = configureStore({
  reducer: {
    question: questionReducer,
    answer: answerReducer,
    refreshQuestionsKey: refreshQuestionsKeyReducer,
    refreshAnswersKey: refreshAnswersKeyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
