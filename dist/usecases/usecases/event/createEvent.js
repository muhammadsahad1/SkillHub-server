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
exports.createEvent = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const createEvent = (userId, data, bannerFile, eventRepository, s3Operations, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield eventRepository.createEvent(userId, data, bannerFile, s3Operations);
        if (!result) {
            return next(new errorMiddleware_js_1.ErrorHandler(401, "Creating event is failed"));
        }
        return result;
    }
    catch (error) {
        return next(new errorMiddleware_js_1.ErrorHandler(500, "Internal Server Error"));
    }
});
exports.createEvent = createEvent;
