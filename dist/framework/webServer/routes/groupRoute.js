import { groupController } from "../injections/injection.js";
import { isAuthenticate } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
export function groupRoute(route) {
    route.post("/createGroup", upload.single("groupImageFile"), isAuthenticate, (req, res, next) => groupController.createGroup(req, res, next));
    route.get("/groups", isAuthenticate, (req, res, next) => groupController.getGroups(req, res, next));
    route.post("/joinGroup", isAuthenticate, (req, res, next) => groupController.joinGroup(req, res, next));
    route.get("/group", isAuthenticate, (req, res, next) => groupController.getGroup(req, res, next));
    route.post("/sendGroupMessage", isAuthenticate, (req, res, next) => groupController.sendMessage(req, res, next));
    route.get("/messages", isAuthenticate, (req, res, next) => groupController.messages(req, res, next));
    route.post("/status", isAuthenticate, (req, res, next) => groupController.updateOnlineStatus(req, res, next));
    route.post("/leave", isAuthenticate, (req, res, next) => groupController.leaveGroup(req, res, next));
    return route;
}
