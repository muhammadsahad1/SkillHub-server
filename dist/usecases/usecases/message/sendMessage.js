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
exports.sendMessage = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const sendMessage = (senderId, receiverId, message, messageRepository, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield messageRepository.sendMessage(senderId, receiverId, message);
        if (!result) {
            return { success: true, result };
        }
        return { success: true, result };
    }
    catch (error) {
        return next(new errorMiddleware_js_1.ErrorHandler(500, "Internal Server Error"));
    }
});
exports.sendMessage = sendMessage;
