import express from 'express';
import {
  createNewsPost,
  getAllNewsPosts,
  getNewsPostById,
  updateNewsPost,
  deleteNewsPost,
} from '../controllers/newsPostController';

const router = express.Router();

router.post('/', createNewsPost);
router.get('/', getAllNewsPosts);
router.get('/:id', getNewsPostById);
router.put('/:id', updateNewsPost);
router.delete('/:id', deleteNewsPost);

export default router;