import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sectionId: { type: String, required: true, ref: "Section" },
  reference: {
    type: {
      type: String,
      enum: ["image", "code"],
      required: false,
    },
    content: { type: String, required: false },
  },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: [String], required: true },
  explanation: { type: String },
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);