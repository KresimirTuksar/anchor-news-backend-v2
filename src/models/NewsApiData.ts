import mongoose, { Schema, Document } from 'mongoose';

export interface NewsApiData extends Document {
  headline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: string;
  isBreakingNews: boolean;
  createdAt: Date;
}

const newsApiDataSchema: Schema = new Schema({
  headline: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  isBreakingNews: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<NewsApiData>('NewsApiData', newsApiDataSchema);
