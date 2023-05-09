"use strict";
// import mongoose, { Schema, Document as MongooseDocument } from 'mongoose';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// export interface NewsPost extends MongooseDocument {
//   headline: string;
//   shortDescription: string;
//   fullDescription: string;
//   image: string;
//   category: string;
//   isBreakingNews: boolean;
//   createdAt: Date;
//   breakingNewsExpiration?: Date | null;}
// const newsPostSchema: Schema = new Schema({
//   headline: { type: String, required: true },
//   shortDescription: { type: String, required: true },
//   fullDescription: { type: String, required: true },
//   image: { type: String, required: true },
//   category: { type: String, required: true },
//   isBreakingNews: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
//   breakingNewsExpiration: { type: Date, default: null },
// });
// export default mongoose.model<NewsPost>('NewsPost', newsPostSchema);
const mongoose_1 = __importStar(require("mongoose"));
const newsPostSchema = new mongoose_1.Schema({
    headline: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    isBreakingNews: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    breakingNewsExpiration: { type: Date, default: null },
});
const NewsPost = mongoose_1.default.model('NewsPost', newsPostSchema);
exports.default = NewsPost;
