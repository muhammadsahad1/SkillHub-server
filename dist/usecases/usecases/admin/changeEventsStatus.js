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
exports.changeEventsStatus = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const changeEventsStatus = (requestId, action, adminRepository, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield adminRepository.changeEventStatus(requestId, action);
        if (!result) {
            return next(new errorMiddleware_js_1.ErrorHandler(401, "Change event status failed"));
        }
        return result;
    }
    catch (error) { }
});
exports.changeEventsStatus = changeEventsStatus;
