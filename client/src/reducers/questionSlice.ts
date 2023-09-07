import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  _id: number | string;
  questionTitle: string;
  upVotes: number;
  downVotes: number;
  noOfAnswers: number;
  questionBody: string;
  questionTags: string[];
  userPosted: string;
  time: string;
  formattedTime: string;
  answer: [
    {
      answerBody: string;
      userAnswered: string;
      answeredOn: Date;
      userId: string;
    }
  ];
}

interface QuestionState {
  questionsList: Question[];
  originalQuestionsList: Question[];
  isLoading: boolean;
  searchQuery: string;
}

interface Answer {
  answerBody: string;
  userAnswered: string;
  answeredOn: Date;
  userId: string;
}

const initialState: QuestionState = {
  questionsList: [],
  originalQuestionsList: [],
  isLoading: true,
  searchQuery: "",
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestionsList: (state, action: PayloadAction<Question[]>) => {
      state.questionsList = action.payload;
      state.isLoading = false;
      state.originalQuestionsList = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addAnswerToQuestion: (
      state,
      action: PayloadAction<{ questionId: string; answer: Answer[] }>
    ) => {
      const { questionId, answer } = action.payload;
      const question = state.questionsList.find((q) => q._id === questionId);

      if (question) {
        question.answer = [...new Set([...question.answer, ...answer])];
        // question.answer.push(...answers);
        question.noOfAnswers += answer.length;
      }

      state.isLoading = false;
    },
  },
});

export const { setQuestionsList, setSearchQuery, addAnswerToQuestion } =
  questionSlice.actions;
export default questionSlice.reducer;
