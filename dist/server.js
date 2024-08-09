import express from "express";
import connectDB from "./framework/webServer/config/db";
import dotenv from "dotenv";
import { userRoute } from "./framework/webServer/routes/userRoute";
import cookieParser from "cookie-parser";
import { errorHandler } from './usecases/middlewares/errorMiddleware';
import cors from "cors";
import { adminRoute } from "./framework/webServer/routes/adminRoute";
dotenv.config();
connectDB();
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    // origin : "https://q8js630t-5173.inc1.devtunnels.ms",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const router = express.Router();
app.use("/user", userRoute(router));
app.use("/admin", adminRoute(router));
app.use(errorHandler);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running here http://localhost:${PORT}`);
});
