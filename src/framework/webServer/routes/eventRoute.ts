import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { eventController } from "../injections/injection";
import upload from "../middleware/multer";
import { isAuthenticate } from "../middleware/auth";
import { CustomRequest } from "../middleware/request/customReq";
// >>>>>>>>>>>>>>>>>>>>>>>>>> Events Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function eventRoute(route : Route) :Route {

  route.post('/createEvent',isAuthenticate,upload.single('bannerFile'),(req : Req , res : Res ,next : Next) => eventController.createEvent(req as CustomRequest,res,next))
  route.get('/getEvents',isAuthenticate,(req : Req , res : Res ,next : Next) => eventController.getEvents(req,res,next))
  route.get('/eventDetails',isAuthenticate,(req : Req , res : Res ,next : Next) => eventController.eventDetails(req,res,next))
  route.post('/eventRegister',isAuthenticate,(req : Req , res : Res ,next : Next) => eventController.eventRegister(req,res,next))
  route.get('/joinMeeting',isAuthenticate,(req : Req , res : Res ,next : Next) => eventController.joinMeeting(req,res,next))
  route.post('/create-checkout-session',isAuthenticate,(req : Req , res : Res ,next : Next) => eventController.makePayment(req,res,next))
  route.post('/changeStatus',isAuthenticate,(req : Req , res : Res ,next : Next) => eventController.changeStatus(req,res,next))
  return route
}