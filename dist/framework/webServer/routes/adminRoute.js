import { adminController } from "../../webServer/injections/injection";
import { isAdminAuthenticate } from "../middleware/adminAuth";
// >>>>>>>>>>>>>>>>>>>>>>>>>> Admin Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function adminRoute(route) {
    route.post("/adminLogin", (req, res, next) => adminController.adminLogin(req, res, next));
    route.get("/users", isAdminAuthenticate, (req, res, next) => adminController.getUsers(req, res, next));
    route.post("/blockUser", (req, res, next) => adminController.blockUser(req, res, next));
    route.post("/logout", (req, res, next) => adminController.logout(req, res, next));
    return route;
}
