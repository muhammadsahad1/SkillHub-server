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
exports.uploadThoughts = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const uploadThoughts = (userId, thoughts, userRepository, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("userId =>", userId);
        const result = yield userRepository.uploadThoughts(userId, thoughts);
        console.log("result==>", result);
        if (!result) {
            return next(new errorMiddleware_js_1.ErrorHandler(401, "Thoughts posting failed"));
        }
        console.log("result after upload the thoughts post ==>", result);
        return result;
    }
    catch (error) {
    }
});
exports.uploadThoughts = uploadThoughts;
