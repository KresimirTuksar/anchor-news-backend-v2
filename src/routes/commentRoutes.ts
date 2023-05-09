import express from 'express';
import commetnsController from '../controllers/commetnsController';
const router = express.Router();

router.put('/add', commetnsController.addComment);
router.delete('/delete', commetnsController.deleteComment);

export default router;