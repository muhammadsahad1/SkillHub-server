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
exports.EventUseCase = void 0;
const index_js_1 = require("../usecases/event/index.js");
class EventUseCase {
    constructor(eventRepository, s3Operations, stripService) {
        this.eventRepository = eventRepository;
        this.s3Operations = s3Operations;
        this.stripService = stripService;
    }
    createEvent(userId, data, bannerFile, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.createEvent)(userId, data, bannerFile, this.eventRepository, this.s3Operations, next);
        });
    }
    getEvents(pageNumber, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getEvents)(pageNumber, next, this.eventRepository, this.s3Operations);
        });
    }
    eventDetails(eventId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.eventDetails)(eventId, this.s3Operations, this.eventRepository, next);
        });
    }
    eventRegister(eventRegisterData, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.eventRegister)(this.stripService, eventRegisterData, this.eventRepository, next);
        });
    }
    getEvent(eventId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getEvent)(eventId, this.eventRepository, next);
        });
    }
    makePayment(eventPrice, eventId, userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.makePayment)(this.stripService, eventPrice, eventId, userId, next);
        });
    }
    changeStatus(eventId, status, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.changeStatus)(eventId, status, this.eventRepository, next);
        });
    }
}
exports.EventUseCase = EventUseCase;
