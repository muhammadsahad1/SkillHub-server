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
exports.userSignup = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const userSignup = (jwt, otpRepository, userRepostory, otpGenerate, hashPassword, user, sendEmail, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existUser = yield userRepostory.findByEmail(user.email);
        if (existUser) {
            console.log("user already exists");
            return next(new errorMiddleware_js_1.ErrorHandler(400, "User already exists"));
        }
        const userInOtp = yield otpRepository.findOtp(user.email);
        if (userInOtp) {
            yield sendEmail.sentEmailVerification(user.name, user.email, userInOtp.otp);
        }
        else {
            const createdOtp = yield otpGenerate.createOtp();
            const responseCreateOtp = yield otpRepository.createOtp(user.name, user.email, user.password, createdOtp);
            yield sendEmail.sentEmailVerification(user.name, user.email, createdOtp);
            const password = yield hashPassword.createHash(user.password);
            user.password = password;
            return { success: true, message: "otp send" };
        }
    }
    catch (error) {
        return next(new errorMiddleware_js_1.ErrorHandler(500, "Internal Error"));
    }
});
exports.userSignup = userSignup;
