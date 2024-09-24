"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoute = notificationRoute;
const injection_1 = require("../../webServer/injections/injection");
const auth_1 = require("../middleware/auth");
// >>>>>>>>>>>>>>>>>>>>>>>>>> Notification Route <<<<<<<<<<<<<<<<<<<<<<<<<
function notificationRoute(route) {
    route.post('/notification', auth_1.isAuthenticate, (req, res, next) => injection_1.notificationController.createNotification(req, res, next));
    route.get('/notification', auth_1.isAuthenticate, (req, res, next) => injection_1.notificationController.getNotifications(req, res, next));
    route.post('/markAsReadNotify', auth_1.isAuthenticate, (req, res, next) => injection_1.notificationController.markAsRead(req, res, next));
    return route;
}
