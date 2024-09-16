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
import { eventRoute } from "../routes/eventRoute";
import { groupRoute } from "../routes/groupRoute";

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://skill-hub-client-eight.vercel.app",];

app.use(
  cors({
    origin:  "https://skill-hub-client-eight.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
router.use((req, res, next) => {
  console.log("request details", req.url, req.method);
  next();
});

app.use("/user", userRoute(router));
app.use("/admin", adminRoute(router));
app.use("/chat", messageRoute(router));
app.use("/event", eventRoute(router));
app.use("/notification", notificationRoute(router));
app.use("/group", groupRoute(router));

app.use(errorHandler);

export { app, allowedOrigins };
