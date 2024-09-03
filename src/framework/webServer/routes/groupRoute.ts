import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { groupController } from "../injections/injection";
import { isAuthenticate } from "../middleware/auth";
import upload from "../middleware/multer";

export function groupRoute(route: Route): Route {
  route.post("/createGroup",upload.single('groupImageFile'), isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.createGroup(req, res, next)
  );

  route.get('/groups',isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.getGroups(req, res, next)
  );

  route.post('/joinGroup',isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.joinGroup(req, res, next));

  route.get('/group',isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.getGroup(req, res, next)
  );

  return route;
}
