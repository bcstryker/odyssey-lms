import mongoose from 'mongoose';

const ContentBlockSchema = new mongoose.Schema({
  type: { type: String, enum: ['text', 'image', 'code'], required: true },
  value: { type: String, required: true },
});

const ResourceSchema = new mongoose.Schema({
  type: { type: String, enum: ['video', 'pdf', 'link'], required: true },
  url: { type: String, required: true },
});

const TopicSchema = new mongoose.Schema({
  sectionId: { type: String, required: true },
  topicId: { type: String, required: true },
  title: { type: String, required: true },
  contentBlocks: [ContentBlockSchema],
  resources: [ResourceSchema], // Corrected to reflect the JSON structure
});

export default mongoose.models.Topic || mongoose.model('Topic', TopicSchema);
