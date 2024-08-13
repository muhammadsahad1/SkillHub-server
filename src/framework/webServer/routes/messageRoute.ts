import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { messageController } from "../../webServer/injections/injection";
import upload from "../middleware/multer";
import { isAuthenticate } from "../middleware/auth";

// >>>>>>>>>>>>>>>>>>>>>>>>>> Message Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function messageRoute(route : Route):Route {
  route.post('/sendChat',isAuthenticate,(req:Req,res : Res,next : Next) => messageController.sendMessage(req,res,next))
  route.get('/getChat',isAuthenticate,(req:Req,res : Res,next : Next) => messageController.getChat(req,res,next))

  return route
}