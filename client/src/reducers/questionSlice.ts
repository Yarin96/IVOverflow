import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
  _id: string;
  upVotes: number;
  downVotes: number;
  noOfAnswers: number;
  questionTitle: string;
  questionBody: string;
  questionTags: string[];
  userPosted: string;
  time: Date;
  answer: Answer[];
  formattedTime: string;
}

interface QuestionState {
  questionsList: Question[];
  originalQuestionsList: Question[];
  isLoading: boolean;
  searchQuery: string;
  upVotes: number;
  downVotes: number;
}

interface Answer {
  _id: string | number;
  answerBody: string;
  userAnswered: string;
  upVotes: number;
  downVotes: number;
  answeredOn: Date;
}

const initialState: QuestionState = {
  questionsList: [],
  originalQuestionsList: [],
  isLoading: true,
  searchQuery: "",
  upVotes: 0,
  downVotes: 0,
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
      action: PayloadAction<{ questionId: string | number; answer: Answer[] }>
    ) => {
      const { questionId, answer } = action.payload;
      const question = state.questionsList.find((q) => q._id === questionId);

      if (question) {
        question.answer = [...new Set([...question.answer, ...answer])];
        question.noOfAnswers += answer.length;
      }

      state.isLoading = false;
    },
    upVoteAnswer: (
      state,
      action: PayloadAction<{
        answerId: string | number;
        questionId: string | number;
      }>
    ) => {
      const { answerId, questionId } = action.payload;
      const question = state.questionsList.find((q) => q._id === questionId);

      if (question) {
        const answer = question.answer.find((a) => a._id === answerId);
        if (answer) {
          answer.upVotes += 1;
        }
      }
    },
    downVoteAnswer: (
      state,
      action: PayloadAction<{
        answerId: string | number;
        questionId: string | number;
      }>
    ) => {
      const { answerId, questionId } = action.payload;
      const question = state.questionsList.find((q) => q._id === questionId);

      if (question) {
        const answer = question.answer.find((a) => a._id === answerId);
        if (answer) {
          answer.downVotes += 1;
        }
      }
    },
  },
});

export const {
  setQuestionsList,
  setSearchQuery,
  addAnswerToQuestion,
  upVoteAnswer,
  downVoteAnswer,
} = questionSlice.actions;
export default questionSlice.reducer;
