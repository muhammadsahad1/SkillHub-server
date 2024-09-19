import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./db.js";
import { userRoute } from "../routes/userRoute.js";
import { adminRoute } from "../routes/adminRoute.js";
import { messageRoute } from "../routes/messageRoute.js";
import { errorHandler } from "../../../usecases/middlewares/errorMiddleware.js";
import { notificationRoute } from "../routes/notificationRoute.js";
import { eventRoute } from "../routes/eventRoute.js";
import { groupRoute } from "../routes/groupRoute.js";
dotenv.config();
connectDB();
const app = express();
const allowedOrigins = [
    "http://localhost:5173",
    "https://skill-hub-share-platform.vercel.app",
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.options("*", cors());
app.use(cookieParser());
app.use(express.json({ limit: '50mb' })); // For JSON bodies
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
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
