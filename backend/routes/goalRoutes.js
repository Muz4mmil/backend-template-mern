import express from 'express'
import { deleteGoal, getGoals, setGoal, updateGoal } from '../controllers/goalController.js'
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.get('/', protect, getGoals)

router.post('/', protect, setGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)


export default router