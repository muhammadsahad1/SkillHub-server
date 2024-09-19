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
  "https://skill-hub-share-platform.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); // For JSON bodies
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

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

export default app;
