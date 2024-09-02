import { Route, Req, Res, Next } from "../../types/serverPackageType";
import { groupController } from "../injections/injection";
import { isAuthenticate } from "../middleware/auth";

export function groupRoute(route: Route): Route {
  route.post("/createGroup", isAuthenticate, (req: Req, res: Res, next: Next) =>
    groupController.createGroup(req, res, next)
  );

  return route;
}
