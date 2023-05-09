import { Request, Response } from 'express';
import Comment from '../models/Comment';
import NewsPost from '../models/NewsPost';
import { CustomRequest } from '../types/types';

export const addComment = async (req: Request, res: Response) => {
  try {
    const {newsPostId, content, commenterName } = req.body;

    console.log({ newsPostId });

    // Create a new comment
    const comment = new Comment({
      content,
      commenterName,
      timestamp: new Date(),
    });

    // Find the news post by ID and add the comment
    const newsPost = await NewsPost.findById(newsPostId);
    if (newsPost) {
      newsPost.comments.push(comment);
      await newsPost.save();
      res.status(201).json(comment);
    } else {
      res.status(404).json({ error: 'News post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

export const deleteComment = async (req: CustomRequest, res: Response) => {
    try {
      const { newsPostId, commentId } = req.params;

      // Find the news post by ID
      const newsPost = await NewsPost.findById(newsPostId);

      // Check if the comment exists and the user is an admin
      if (newsPost) {
        const commentIndex = newsPost.comments.findIndex((comment) => comment._id.equals(commentId));
        if (commentIndex !== -1) {
          const isAdmin = req.user?.role == "admin";
          if (isAdmin) {
            // Delete the comment
            newsPost.comments.splice(commentIndex, 1);
            await newsPost.save();
            res.status(200).json({ message: 'Comment deleted successfully' });
          } else {
            res.status(403).json({ error: 'You are not authorized to delete comments' });
          }
        } else {
          res.status(404).json({ error: 'Comment not found' });
        }
      } else {
        res.status(404).json({ error: 'News post not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  };

  export default {
    addComment,
    deleteComment
};