"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNewsPost = exports.updateNewsPost = exports.getNewsPostById = exports.getAllNewsPosts = exports.createNewsPost = void 0;
// import NewsPost from '../models/NewsPost';
const NewsPost_1 = __importDefault(require("../models/NewsPost"));
// Create a new news post
// export const createNewsPost = async (req: Request, res: Response) => {
//   try {
//     const newsPostData: typeof NewsPost = req.body;
//     const newsPost = await NewsPost.create(newsPostData);
//     res.status(201).json(newsPost);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create news post' });
//   }
// };
const createNewsPost = async (req, res) => {
    try {
        const newsPostData = req.body;
        const existingBreakingNews = await NewsPost_1.default.findOne({ isBreakingNews: true });
        // Check if there is an existing breaking news post
        if (newsPostData.isBreakingNews && existingBreakingNews) {
            return res.status(400).json({ error: 'There is already an active breaking news post' });
        }
        // Set the breaking news expiration date/time
        if (newsPostData.isBreakingNews) {
            const expirationDate = new Date();
            expirationDate.setHours(expirationDate.getHours() + 48);
            // Add the expiration date to the news post data
            newsPostData.breakingNewsExpiration = expirationDate;
        }
        const newsPost = await NewsPost_1.default.create(newsPostData);
        res.status(201).json(newsPost);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create news post' });
    }
};
exports.createNewsPost = createNewsPost;
// Get all news posts
const getAllNewsPosts = async (req, res) => {
    try {
        const newsPosts = await NewsPost_1.default.find().sort({ createdAt: -1 });
        res.json(newsPosts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve news posts' });
    }
};
exports.getAllNewsPosts = getAllNewsPosts;
// Get a specific news post by ID
const getNewsPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const newsPost = await NewsPost_1.default.findById(id);
        if (!newsPost) {
            return res.status(404).json({ error: 'News post not found' });
        }
        res.json(newsPost);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve news post' });
    }
};
exports.getNewsPostById = getNewsPostById;
// Update a news post by ID
// export const updateNewsPost = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const newsPostData: Partial<typeof NewsPost> = req.body;
//   try {
//     const newsPost = await NewsPost.findByIdAndUpdate(id, newsPostData, { new: true });
//     if (!newsPost) {
//       return res.status(404).json({ error: 'News post not found' });
//     }
//     res.json(newsPost);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update news post' });
//   }
// };
const updateNewsPost = async (req, res) => {
    try {
        const newsPostId = req.params.id;
        const newsPostData = req.body;
        const existingBreakingNews = await NewsPost_1.default.findOne({ isBreakingNews: true });
        const newsPostToUpdate = await NewsPost_1.default.findById(newsPostId);
        console.log(newsPostToUpdate);
        // Set the breaking news expiration date/time
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 48);
        if (!newsPostToUpdate) {
            return res.status(404).json({ error: 'News post not found' });
        }
        else if (existingBreakingNews && existingBreakingNews._id.toString() === newsPostId) {
            const updatedexistingBreakingNews = await NewsPost_1.default.findByIdAndUpdate(existingBreakingNews._id, existingBreakingNews, {
                new: true,
            });
            res.json(updatedexistingBreakingNews);
        }
        else if (existingBreakingNews && existingBreakingNews._id.toString() !== newsPostId) {
            existingBreakingNews.isBreakingNews = false;
            existingBreakingNews.breakingNewsExpiration = null;
            const updatedexistingBreakingNews = await NewsPost_1.default.findByIdAndUpdate(existingBreakingNews._id, existingBreakingNews, {
                new: true,
            });
            newsPostData.breakingNewsExpiration = expirationDate;
            const updatedNewsPost = await NewsPost_1.default.findByIdAndUpdate(newsPostId, newsPostData, {
                new: true,
            });
            res.json(updatedNewsPost);
        }
        else {
            newsPostData.breakingNewsExpiration = expirationDate;
            const updatedNewsPost = await NewsPost_1.default.findByIdAndUpdate(newsPostId, newsPostData, {
                new: true,
            });
            res.json(updatedNewsPost);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update news post' });
    }
};
exports.updateNewsPost = updateNewsPost;
// Delete a news post by ID
const deleteNewsPost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNewsPost = await NewsPost_1.default.findByIdAndDelete(id);
        if (!deletedNewsPost) {
            return res.status(404).json({ error: 'News post not found' });
        }
        res.json({ message: 'News post deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete news post' });
    }
};
exports.deleteNewsPost = deleteNewsPost;
