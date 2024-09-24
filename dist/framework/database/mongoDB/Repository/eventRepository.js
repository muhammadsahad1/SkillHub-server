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
exports.EventRepository = void 0;
const index_js_1 = require("./event/index.js");
class EventRepository {
    constructor(eventModel, eventPaymentModel, userModels) {
        this.eventModel = eventModel;
        this.eventPaymentModel = eventPaymentModel;
        this.userModels = userModels;
    }
    createEvent(userId, data, bannerFile, s3) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.createOrUpdateEvent)(userId, data, bannerFile, s3, this.eventModel);
        });
    }
    getEvents(pageNumber, s3) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getEvents)(pageNumber, this.eventModel, s3);
        });
    }
    eventDetails(eventId, s3Operations) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.eventDetails)(eventId, this.eventModel, s3Operations);
        });
    }
    eventRegister(stripService, eventRegisterData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.eventRegister)(eventRegisterData, this.eventModel, this.eventPaymentModel, this.userModels);
        });
    }
    getEvent(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getEvent)(eventId, this.eventModel);
        });
    }
    changeStatus(eventId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.changeStatus)(eventId, status, this.eventModel);
        });
    }
}
exports.EventRepository = EventRepository;
