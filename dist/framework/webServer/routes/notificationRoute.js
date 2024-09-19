import { notificationController } from "../../webServer/injections/injection.js";
import { isAuthenticate } from '../middleware/auth.js';
// >>>>>>>>>>>>>>>>>>>>>>>>>> Notification Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function notificationRoute(route) {
    route.post('/notification', isAuthenticate, (req, res, next) => notificationController.createNotification(req, res, next));
    route.get('/notification', isAuthenticate, (req, res, next) => notificationController.getNotifications(req, res, next));
    route.post('/markAsReadNotify', isAuthenticate, (req, res, next) => notificationController.markAsRead(req, res, next));
    return route;
}
