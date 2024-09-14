import { messageController } from "../../webServer/injections/injection";
import upload from "../middleware/multer";
// import upload from "../middleware/multer";
import { isAuthenticate } from "../middleware/auth";
// >>>>>>>>>>>>>>>>>>>>>>>>>> Message Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function messageRoute(route) {
    route.post('/sendChat', isAuthenticate, (req, res, next) => messageController.sendMessage(req, res, next));
    route.get('/getChat', isAuthenticate, (req, res, next) => messageController.getChat(req, res, next));
    route.get('/chatUsers', isAuthenticate, (req, res, next) => messageController.chatUsers(req, res, next));
    route.post('/markAsRead', isAuthenticate, (req, res, next) => messageController.markAsRead(req, res, next));
    route.post('/sendImage', upload.single("image"), isAuthenticate, (req, res, next) => messageController.uploadImage(req, res, next));
    return route;
}
