import mongoose, { Document, Schema, Types } from 'mongoose';
import { Comment } from './Comment';

export interface NewsPostModel extends Document {
  headline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: string;
  isBreakingNews: boolean;
  breakingNewsExpiration?: Date | null;
  createdAt: Date;
  viewCount: number;
  comments: Types.Array<Comment>;
}

const newsPostSchema: Schema = new Schema({
  headline: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  isBreakingNews: { type: Boolean, default: false },
  breakingNewsExpiration: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  viewCount: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

const NewsPost = mongoose.model<NewsPostModel>('NewsPost', newsPostSchema);

export default NewsPost;