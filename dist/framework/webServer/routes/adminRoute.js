"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = adminRoute;
const injection_1 = require("../../webServer/injections/injection");
const adminAuth_1 = require("../middleware/adminAuth");
// >>>>>>>>>>>>>>>>>>>>>>>>>> Admin Route <<<<<<<<<<<<<<<<<<<<<<<<<
function adminRoute(route) {
    route.post("/adminLogin", (req, res, next) => injection_1.adminController.adminLogin(req, res, next));
    route.get("/users", adminAuth_1.isAdminAuthenticate, (req, res, next) => injection_1.adminController.getUsers(req, res, next));
    route.post("/blockUser", adminAuth_1.isAdminAuthenticate, (req, res, next) => injection_1.adminController.blockUser(req, res, next));
    route.get('/verification-request', adminAuth_1.isAdminAuthenticate, (req, res, next) => injection_1.adminController.getVerificationRequests(req, res, next));
    route.post('/changeVerifyStatus', adminAuth_1.isAdminAuthenticate, (req, res, next) => injection_1.adminController.changeVerifyStatus(req, res, next));
    route.get('/events', adminAuth_1.isAdminAuthenticate, (req, res, next) => injection_1.adminController.getEvents(req, res, next));
    route.post('/changeEventsStatus', adminAuth_1.isAdminAuthenticate, (req, res, next) => injection_1.adminController.changeEventStatus(req, res, next));
    route.get('/reports', adminAuth_1.isAdminAuthenticate, (req, res, next) => injection_1.adminController.getReports(req, res, next));
    route.post('/action', adminAuth_1.isAdminAuthenticate, (req, res, next) => injection_1.adminController.reportAction(req, res, next));
    route.get('/dashboard', adminAuth_1.isAdminAuthenticate, (req, res, next) => injection_1.adminController.dasboardData(req, res, next));
    route.post("/adminLogout", adminAuth_1.isAdminAuthenticate, (req, res, next) => injection_1.adminController.logout(req, res, next));
    return route;
}
