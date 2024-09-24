"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoute = messageRoute;
const injection_1 = require("../../webServer/injections/injection");
const multer_1 = __importDefault(require("../middleware/multer"));
// import upload from "../middleware/multer";
const auth_1 = require("../middleware/auth");
// >>>>>>>>>>>>>>>>>>>>>>>>>> Message Route <<<<<<<<<<<<<<<<<<<<<<<<<
function messageRoute(route) {
    route.post('/sendChat', auth_1.isAuthenticate, (req, res, next) => injection_1.messageController.sendMessage(req, res, next));
    route.get('/getChat', auth_1.isAuthenticate, (req, res, next) => injection_1.messageController.getChat(req, res, next));
    route.get('/chatUsers', auth_1.isAuthenticate, (req, res, next) => injection_1.messageController.chatUsers(req, res, next));
    route.post('/markAsRead', auth_1.isAuthenticate, (req, res, next) => injection_1.messageController.markAsRead(req, res, next));
    route.post('/sendImage', multer_1.default.single("image"), auth_1.isAuthenticate, (req, res, next) => injection_1.messageController.uploadImage(req, res, next));
    return route;
}
