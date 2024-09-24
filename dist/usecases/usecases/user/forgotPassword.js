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
exports.forgotPassword = void 0;
const errorMiddleware_1 = require("../../middlewares/errorMiddleware");
const forgotPassword = (jwt, userRepository, sendEmail, email, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userRepository.findByEmail(email);
        if (!user) {
            return next(new errorMiddleware_1.ErrorHandler(401, "User not found"));
        }
        // forgotToken generating FN
        const resetPassToken = yield jwt.forgotPasswordToken(user === null || user === void 0 ? void 0 : user.id, user.email);
        // passing the user email and resetToken for update
        const fetechedUser = yield userRepository.findOneUpdateResetToken(email, resetPassToken);
        if (!fetechedUser) {
            return next(new errorMiddleware_1.ErrorHandler(404, "Updateing found error"));
        }
        yield sendEmail.sentResetLinkVerification(fetechedUser.name, fetechedUser.email, resetPassToken);
        return {
            success: true,
            token: resetPassToken,
            user: fetechedUser,
            message: "Resetpassord link has been sended",
        };
    }
    catch (error) { }
});
exports.forgotPassword = forgotPassword;
