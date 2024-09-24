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
exports.myFollowers = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const myFollowers = (userId, s3, userRepository, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followers = yield userRepository.myFollowers(userId, s3);
        if (!followers) {
            return next(new errorMiddleware_js_1.ErrorHandler(400, "User is not found"));
        }
        return followers;
    }
    catch (error) {
        return next(new errorMiddleware_js_1.ErrorHandler(400, "User is not found"));
    }
});
exports.myFollowers = myFollowers;
