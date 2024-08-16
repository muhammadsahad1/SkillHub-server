import { Route, Req, Res, Next } from "../../types/serverPackageType";
import {notificationController } from   "../../webServer/injections/injection";
import { isAuthenticate } from '../middleware/auth'

// >>>>>>>>>>>>>>>>>>>>>>>>>> Notification Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function notificationRoute(route : Route) : Route {
  route.post('/notification',isAuthenticate,(req:Req,res : Res,next :Next) => notificationController.createNotification(req,res,next))
  route.get('/notification',isAuthenticate,(req:Req,res : Res,next :Next) => notificationController.getNotifications(req,res,next))
  return route
}