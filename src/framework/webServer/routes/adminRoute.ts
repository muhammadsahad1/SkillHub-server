import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { adminController } from "../../webServer/injections/injection";

// >>>>>>>>>>>>>>>>>>>>>>>>>> Admin Route <<<<<<<<<<<<<<<<<<<<<<<<<

export function adminRoute(route: Route): Route {
  route.post("/adminLogin", (req: Req, res: Res, next: Next) => {
    adminController.adminLogin(req, res, next);
  });

  route.get("/getUsers", (req: Req, res: Res, next: Next) => {
    adminController.getUsers(req,res,next)
  });

  route.post("/blockUser", (req: Req, res: Res, next: Next) => {
    adminController.blockUser(req,res,next)
  });

  return route;
}
