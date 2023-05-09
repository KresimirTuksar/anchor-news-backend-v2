import mongoose, { Schema, Document } from 'mongoose';

export interface Comment extends Document {
  content: string;
  commenterName: string;
  timestamp: Date;
}

const commentSchema: Schema = new Schema({
  content: { type: String, required: true },
  commenterName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<Comment>('Comment', commentSchema);