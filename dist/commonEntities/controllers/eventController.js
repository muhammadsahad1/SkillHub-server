"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const errorMiddleware_1 = require("../../usecases/middlewares/errorMiddleware");
// [=============================== Event Controller =============================]
class EventController {
    constructor(eventUseCase) {
        this.eventUseCase = eventUseCase;
    }
    // creating Event
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const data = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield ((_b = this.eventUseCase) === null || _b === void 0 ? void 0 : _b.createEvent(userId, data, req.file, next));
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // fetching the all events
    getEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.q ==>", req.query);
                const pageNumber = parseInt(req.query.pageNumber, 10);
                const result = yield this.eventUseCase.getEvents(pageNumber, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    eventDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = req.query.eventId;
                const result = yield this.eventUseCase.eventDetails(eventId, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    eventRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { registerData } = req.body;
                const result = yield this.eventUseCase.eventRegister(registerData, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    joinMeeting(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.query;
                const result = yield this.eventUseCase.getEvent(eventId, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    makePayment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventPrice, eventId, userId } = req.body;
                console.log("bodyy ==>", req.body);
                const result = yield this.eventUseCase.makePayment(eventPrice, eventId, userId, next);
                console.log("resu ==>", result);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    changeStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId, status } = req.body;
            const result = yield this.eventUseCase.changeStatus(eventId, status, next);
            if (result) {
                res.status(200).json(status);
            }
        });
    }
}
exports.EventController = EventController;
