import mongoose from "mongoose";

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  upVotes: { type: Number, default: 0 },
  downVotes: { type: Number, default: 0 },
  noOfAnswers: { type: Number, default: 0 },
  questionTitle: { type: String, required: "Question must have a title" },
  questionBody: { type: String, required: "Question must have a body" },
  questionTags: { type: [String], required: "Questions must have tags" },
  userPosted: { type: String, required: "Questions must have author" },
  time: { type: Date, default: Date.now },
  userId: { type: String },
  answer: [
    {
      answerBody: String,
      userAnswered: String,
      answeredOn: { type: Date, default: Date.now },
      userId: String,
      upVotes: { type: Number, default: 0 },
      downVotes: { type: Number, default: 0 },
      votes: {
        upVotes: { type: [String] },
        downVotes: { type: [String] },
      },
    },
  ],
});

questionSchema.virtual("formattedTime").get(function () {
  const date = this.time;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
});

questionSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Question", questionSchema);
