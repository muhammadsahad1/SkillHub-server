import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { groupController } from "../injections/injection";
import { isAuthenticate } from "../middleware/auth";
import upload from "../middleware/multer";
import { CustomRequest } from "../middleware/request/customReq";

export function groupRoute(route: Route): Route {
  route.post(
    "/createGroup",
    upload.single("groupImageFile"),
    isAuthenticate,
    (req: Req, res: Res, next: Next) =>
      groupController.createGroup(req as CustomRequest, res, next)
  );

  route.get("/groups", isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.getGroups(req, res, next)
  );

  route.post("/joinGroup", isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.joinGroup(req as CustomRequest, res, next)
  );

  route.get("/group", isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.getGroup(req, res, next)
  );

  route.post(
    "/sendGroupMessage",
    isAuthenticate,
    (req: Req, res: Res, next: Next) =>
      groupController.sendMessage(req as CustomRequest, res, next)
  );

  route.get("/messages", isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.messages(req, res, next)
  );

  route.post("/status", isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.updateOnlineStatus(req, res, next)
  );

  route.post("/leave", isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.leaveGroup(req as CustomRequest, res, next)
  );

  return route;
}
