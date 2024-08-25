import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { adminController } from "../../webServer/injections/injection";
import { isAdminAuthenticate } from "../middleware/adminAuth";

// >>>>>>>>>>>>>>>>>>>>>>>>>> Admin Route <<<<<<<<<<<<<<<<<<<<<<<<<

export function adminRoute(route: Route): Route {
  route.post("/adminLogin",isAdminAuthenticate, (req: Req, res: Res, next: Next) => adminController.adminLogin(req, res, next));
  route.get("/users", isAdminAuthenticate, (req: Req, res: Res, next: Next) => adminController.getUsers(req, res, next));
  route.post("/blockUser",isAdminAuthenticate, (req: Req, res: Res, next: Next) => adminController.blockUser(req, res, next));
  route.get('verification-request',isAdminAuthenticate,(req : Req, res : Res ,next : Next) => adminController.getVerificationRequests(req,res,next))
  route.post('/changeVerifyStatus',isAdminAuthenticate,(req : Req, res : Res ,next : Next) => adminController.changeVerifyStatus(req,res,next))
  route.post("/logout", (req: Req, res: Res, next: Next) => adminController.logout(req, res, next));

  return route;
}
