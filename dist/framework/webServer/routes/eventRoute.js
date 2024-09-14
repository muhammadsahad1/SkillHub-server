import { eventController } from "../injections/injection";
import upload from "../middleware/multer";
import { isAuthenticate } from "../middleware/auth";
// >>>>>>>>>>>>>>>>>>>>>>>>>> Events Route <<<<<<<<<<<<<<<<<<<<<<<<<
export function eventRoute(route) {
    route.post('/createEvent', isAuthenticate, upload.single('bannerFile'), (req, res, next) => eventController.createEvent(req, res, next));
    route.get('/getEvents', isAuthenticate, (req, res, next) => eventController.getEvents(req, res, next));
    route.get('/eventDetails', isAuthenticate, (req, res, next) => eventController.eventDetails(req, res, next));
    route.post('/eventRegister', isAuthenticate, (req, res, next) => eventController.eventRegister(req, res, next));
    route.get('/joinMeeting', isAuthenticate, (req, res, next) => eventController.joinMeeting(req, res, next));
    route.post('/create-checkout-session', isAuthenticate, (req, res, next) => eventController.makePayment(req, res, next));
    route.post('/changeStatus', isAuthenticate, (req, res, next) => eventController.changeStatus(req, res, next));
    return route;
}
