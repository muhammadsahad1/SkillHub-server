"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoute = eventRoute;
const injection_1 = require("../injections/injection");
const multer_1 = __importDefault(require("../middleware/multer"));
const auth_1 = require("../middleware/auth");
// >>>>>>>>>>>>>>>>>>>>>>>>>> Events Route <<<<<<<<<<<<<<<<<<<<<<<<<
function eventRoute(route) {
    route.post('/createEvent', auth_1.isAuthenticate, multer_1.default.single('bannerFile'), (req, res, next) => injection_1.eventController.createEvent(req, res, next));
    route.get('/getEvents', auth_1.isAuthenticate, (req, res, next) => injection_1.eventController.getEvents(req, res, next));
    route.get('/eventDetails', auth_1.isAuthenticate, (req, res, next) => injection_1.eventController.eventDetails(req, res, next));
    route.post('/eventRegister', auth_1.isAuthenticate, (req, res, next) => injection_1.eventController.eventRegister(req, res, next));
    route.get('/joinMeeting', auth_1.isAuthenticate, (req, res, next) => injection_1.eventController.joinMeeting(req, res, next));
    route.post('/create-checkout-session', auth_1.isAuthenticate, (req, res, next) => injection_1.eventController.makePayment(req, res, next));
    route.post('/changeStatus', auth_1.isAuthenticate, (req, res, next) => injection_1.eventController.changeStatus(req, res, next));
    return route;
}
