"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRoute = groupRoute;
const injection_1 = require("../injections/injection");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("../middleware/multer"));
function groupRoute(route) {
    route.post("/createGroup", multer_1.default.single("groupImageFile"), auth_1.isAuthenticate, (req, res, next) => injection_1.groupController.createGroup(req, res, next));
    route.get("/groups", auth_1.isAuthenticate, (req, res, next) => injection_1.groupController.getGroups(req, res, next));
    route.post("/joinGroup", auth_1.isAuthenticate, (req, res, next) => injection_1.groupController.joinGroup(req, res, next));
    route.get("/group", auth_1.isAuthenticate, (req, res, next) => injection_1.groupController.getGroup(req, res, next));
    route.post("/sendGroupMessage", auth_1.isAuthenticate, (req, res, next) => injection_1.groupController.sendMessage(req, res, next));
    route.get("/messages", auth_1.isAuthenticate, (req, res, next) => injection_1.groupController.messages(req, res, next));
    route.post("/status", auth_1.isAuthenticate, (req, res, next) => injection_1.groupController.updateOnlineStatus(req, res, next));
    route.post("/leave", auth_1.isAuthenticate, (req, res, next) => injection_1.groupController.leaveGroup(req, res, next));
    return route;
}
