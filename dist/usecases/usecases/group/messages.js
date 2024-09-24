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
exports.messages = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const messages = (groupId, groupRepository, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield groupRepository.messages(groupId);
        if (!result) {
            return next(new errorMiddleware_js_1.ErrorHandler(401, "join group failed"));
        }
        console.log("res ==>", result);
        return result;
    }
    catch (error) {
        return next(new errorMiddleware_js_1.ErrorHandler(401, "Internal server error"));
    }
});
exports.messages = messages;
