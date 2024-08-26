import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { eventController } from "../injections/injection";

// >>>>>>>>>>>>>>>>>>>>>>>>>> Events Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function eventRoute(route : Route) :Route {
  route.post('/event',(req : Req , res : Res ,next : Next) => eventController.createEvent(req,res,next))
  return route
}