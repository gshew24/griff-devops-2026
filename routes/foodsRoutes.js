import express from 'express';
import {
  getFoods,
  createFood,
  updateFood,
  deleteFood
} from '../controllers/foodsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getFoods);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

export default router;