import mongoose from 'mongoose';

const SectionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  sectionId: { type: String, required: true },
  course: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    code: { type: String, required: true }
  },  
  number: { type: Number, required: true },
  title: { type: String, required: true }
});

export default mongoose.models.Section || mongoose.model('Section', SectionSchema);