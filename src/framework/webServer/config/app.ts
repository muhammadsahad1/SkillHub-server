import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db";
import { userRoute } from "../routes/userRoute";
import { adminRoute } from "../routes/adminRoute";
import { messageRoute } from "../routes/messageRoute";
import { errorHandler } from "../../../usecases/middlewares/errorMiddleware";
import { notificationRoute } from "../routes/notificationRoute";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

app.use("/user", userRoute(router));
app.use("/admin", adminRoute(router));
app.use("/chat",messageRoute(router))
app.use('/notification',notificationRoute(router))


app.use(errorHandler);

export { app, allowedOrigins };
