import express from 'express';
import apiController from '../controllers/apiController';
const router = express.Router();

router.get('/', apiController.fetchAndSaveNewsData);
router.get('/savedNews', apiController.getAllApiNewsPosts);


export default router;