import { Request, Response } from 'express';
import NewsPost, { NewsPostModel } from '../models/NewsPost';

export const createNewsPost = async (req: Request, res: Response) => {
  try {
    const newsPostData: Partial<NewsPostModel> = req.body;
    const existingBreakingNews = await NewsPost.findOne({ isBreakingNews: true });

    // Check if there is an existing breaking news post
    if (newsPostData.isBreakingNews && existingBreakingNews) {
      existingBreakingNews.isBreakingNews = false;
      existingBreakingNews.breakingNewsExpiration = null;
      // return res.status(400).json({ error: 'There is already an active breaking news post' });
    }

    // Set the breaking news expiration date/time
    if (newsPostData.isBreakingNews) {
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 48);

      // Add the expiration date to the news post data
      newsPostData.breakingNewsExpiration = expirationDate;
    }

    const newsPost = await NewsPost.create(newsPostData);
    res.status(201).json(newsPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news post' });
  }
};

// Get all news posts
export const getAllNewsPosts = async (req: Request, res: Response) => {
  try {
    const newsPosts = await NewsPost.find().sort({ createdAt: -1 });
    res.json(newsPosts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve news posts' });
  }
};

// Get a specific news post by ID
export const getNewsPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const newsPost = await NewsPost.findById(id);
    if (!newsPost) {
      return res.status(404).json({ error: 'News post not found' });
    }
    newsPost.viewCount += 1; //added increment view count here
    await newsPost.save();
    res.json(newsPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve news post' });
  }
};

export const updateNewsPost = async (req: Request, res: Response) => {
  try {
    const newsPostId = req.params.id;
    const newsPostData: Partial<NewsPostModel> = req.body;
    const existingBreakingNews = await NewsPost.findOne({ isBreakingNews: true });
    const newsPostToUpdate = await NewsPost.findById(newsPostId);

    // Set the breaking news expiration date/time
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 48);

    if (newsPostToUpdate === null) {
      return res.status(404).json({ error: 'News post not found' });
    }
    else if (existingBreakingNews && existingBreakingNews._id.toString() === newsPostId){

      const updatedexistingBreakingNews = await NewsPost.findByIdAndUpdate(existingBreakingNews._id, existingBreakingNews, {
        new: true,
      });

      res.json(updatedexistingBreakingNews);

    }
    else if (existingBreakingNews && existingBreakingNews._id.toString() !== newsPostId) {
      existingBreakingNews.isBreakingNews = false;
      existingBreakingNews.breakingNewsExpiration = null;

      const updatedexistingBreakingNews = await NewsPost.findByIdAndUpdate(existingBreakingNews._id, existingBreakingNews, {
        new: true,
      });

      newsPostData.breakingNewsExpiration = expirationDate;

      const updatedNewsPost = await NewsPost.findByIdAndUpdate(newsPostId, newsPostData, {
        new: true,
      });

      res.json(updatedNewsPost);

    }
    else{
      newsPostData.breakingNewsExpiration = expirationDate;

      const updatedNewsPost = await NewsPost.findByIdAndUpdate(newsPostId, newsPostData, {
        new: true,
      });

      res.json(updatedNewsPost);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news post' });
  }
};

// Delete a news post by ID
export const deleteNewsPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedNewsPost = await NewsPost.findByIdAndDelete(id);
    if (!deletedNewsPost) {
      return res.status(404).json({ error: 'News post not found' });
    }
    res.json({ message: 'News post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news post' });
  }
};

export const incrementViewCount = async (req: Request, res: Response) => {
  try {
    const { newsPostId } = req.params;

    // Find the news post by ID
    const newsPost = await NewsPost.findById(newsPostId);

    // Increment the view count
    if (newsPost) {
      newsPost.viewCount += 1;
      await newsPost.save();
      res.status(200).json({ message: 'View count incremented successfully' });
    } else {
      res.status(404).json({ error: 'News post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to increment view count' });
  }
};

