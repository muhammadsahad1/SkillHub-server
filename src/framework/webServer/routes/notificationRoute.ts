import { Route, Req, Res, Next } from "../../types/serverPackageType";
import {notificationController } from   "../../webServer/injections/injection";
import { isAuthenticate } from '../middleware/auth'
import { CustomRequest } from "../middleware/request/customReq";

// >>>>>>>>>>>>>>>>>>>>>>>>>> Notification Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function notificationRoute(route : Route) : Route {
  route.post('/notification',isAuthenticate,(req:Req,res : Res,next :Next) => notificationController.createNotification(req,res,next))
  route.get('/notification',isAuthenticate,(req:Req,res : Res,next :Next) => notificationController.getNotifications(req as CustomRequest,res,next))
  route.post('/markAsReadNotify',isAuthenticate,(req:Req,res : Res,next :Next) => notificationController.markAsRead(req,res,next))

  return route
}