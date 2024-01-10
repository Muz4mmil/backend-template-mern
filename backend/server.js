import express from 'express'
import dotenv from 'dotenv';
import goalRouter from './routes/goalRoutes.js';
import userRouter from './routes/userRoutes.js';
import { connectDB } from './config/db.js';

dotenv.config();
const PORT = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', goalRouter)
app.use('/api/users', userRouter)

app.listen(PORT, () => console.log(`server started at ${PORT}`))