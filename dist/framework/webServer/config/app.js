"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const userRoute_1 = require("../routes/userRoute");
const adminRoute_1 = require("../routes/adminRoute");
const messageRoute_1 = require("../routes/messageRoute");
const errorMiddleware_1 = require("../../../usecases/middlewares/errorMiddleware");
const notificationRoute_1 = require("../routes/notificationRoute");
const eventRoute_1 = require("../routes/eventRoute");
const groupRoute_1 = require("../routes/groupRoute");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://skill-hub-share-platform.vercel.app",
];
app.use((0, cors_1.default)({
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
app.options("*", (0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "50mb" })); // For JSON bodies
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
const router = express_1.default.Router();
router.use((req, res, next) => {
    console.log("request details", req.url, req.method);
    next();
});
app.use("/user", (0, userRoute_1.userRoute)(router));
app.use("/admin", (0, adminRoute_1.adminRoute)(router));
app.use("/chat", (0, messageRoute_1.messageRoute)(router));
app.use("/event", (0, eventRoute_1.eventRoute)(router));
app.use("/notification", (0, notificationRoute_1.notificationRoute)(router));
app.use("/group", (0, groupRoute_1.groupRoute)(router));
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
