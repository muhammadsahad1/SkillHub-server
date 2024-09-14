import { adminController } from "../../webServer/injections/injection";
import { isAdminAuthenticate } from "../middleware/adminAuth";
// >>>>>>>>>>>>>>>>>>>>>>>>>> Admin Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function adminRoute(route) {
    route.post("/adminLogin", isAdminAuthenticate, (req, res, next) => adminController.adminLogin(req, res, next));
    route.get("/users", isAdminAuthenticate, (req, res, next) => adminController.getUsers(req, res, next));
    route.post("/blockUser", isAdminAuthenticate, (req, res, next) => adminController.blockUser(req, res, next));
    route.get('/verification-request', isAdminAuthenticate, (req, res, next) => adminController.getVerificationRequests(req, res, next));
    route.post('/changeVerifyStatus', isAdminAuthenticate, (req, res, next) => adminController.changeVerifyStatus(req, res, next));
    route.get('/events', isAdminAuthenticate, (req, res, next) => adminController.getEvents(req, res, next));
    route.post('/changeEventsStatus', isAdminAuthenticate, (req, res, next) => adminController.changeEventStatus(req, res, next));
    route.get('/reports', isAdminAuthenticate, (req, res, next) => adminController.getReports(req, res, next));
    route.post('/action', isAdminAuthenticate, (req, res, next) => adminController.reportAction(req, res, next));
    route.get('/dashboard', isAdminAuthenticate, (req, res, next) => adminController.dasboardData(req, res, next));
    route.post("/adminLogout", isAdminAuthenticate, (req, res, next) => adminController.logout(req, res, next));
    return route;
}
