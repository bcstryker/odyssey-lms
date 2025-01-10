import mongoose from "mongoose";

const FlashCardSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // MongoDB-generated unique identifier
  sectionId: { type: String, required: true, ref: "Section" }, // Section reference
  topicId: { type: String, ref: "Topic" }, // Optional reference to a specific topic
  front: { type: String, required: true }, // Content displayed on the front of the flashcard
  back: { type: String, required: true }, // Content displayed on the back of the flashcard
  tags: { type: [String], default: [] }, // Optional tags for categorization or search
  createdAt: { type: Date, default: Date.now }, // Creation timestamp
  updatedAt: { type: Date, default: Date.now }, // Update timestamp
});

// Update the updatedAt timestamp before saving the document
// FlashCardSchema.pre("save", function (next) {
//   this.updatedAt = new Date();
//   next();
// });

export default mongoose.models.FlashCard || mongoose.model('FlashCard', FlashCardSchema);