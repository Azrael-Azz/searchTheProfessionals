import express from 'express';
import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}
));


dotenv.config();

//helps read json data
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
export default app;