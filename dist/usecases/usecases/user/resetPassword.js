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
exports.resetPassword = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const resetPassword = (password, token, userRepository, hashPassword, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield hashPassword.createHash(password);
        const result = yield userRepository.resetPasswordVerify(hashedPassword, token);
        if (result) {
            return {
                success: true,
                user: result,
                message: "reset password successfully"
            };
        }
    }
    catch (error) {
        return next(new errorMiddleware_js_1.ErrorHandler(400, "failed tp reset password"));
    }
});
exports.resetPassword = resetPassword;
