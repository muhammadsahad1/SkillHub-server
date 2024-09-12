import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { messageController } from "../../webServer/injections/injection";
import upload from "../middleware/multer";
// import upload from "../middleware/multer";
import { isAuthenticate } from "../middleware/auth";
import { CustomRequest } from "../middleware/request/customReq";

// >>>>>>>>>>>>>>>>>>>>>>>>>> Message Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function messageRoute(route : Route):Route {
  route.post('/sendChat',isAuthenticate,(req:Req,res : Res,next : Next) => messageController.sendMessage(req as CustomRequest,res,next))
  route.get('/getChat',isAuthenticate,(req:Req,res : Res,next : Next) => messageController.getChat(req,res,next))
  route.get('/chatUsers',isAuthenticate,(req:Req,res : Res,next : Next) => messageController.chatUsers(req as CustomRequest,res,next))
  route.post('/markAsRead',isAuthenticate,(req:Req,res : Res,next : Next) => messageController.markAsRead(req as CustomRequest,res,next))
  route.post('/sendImage',upload.single("image"),isAuthenticate,(req:Req,res : Res,next : Next) => messageController.uploadImage(req,res,next))

  return route
}