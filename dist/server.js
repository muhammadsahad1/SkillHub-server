import express from 'express';
import connectDB from './src/framework/webServer/config/db';
import dotenv from 'dotenv';
dotenv.config();
connectDB();
const app = express();
const PORT = p;
app.listen(PORT, () => console.log(`server is running here http://localhost:${PORT}`));
