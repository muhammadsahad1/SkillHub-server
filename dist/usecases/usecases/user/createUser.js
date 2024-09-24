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
exports.createUser = void 0;
const errorMiddleware_1 = require("../../middlewares/errorMiddleware");
// Creating user after user submits the OTP
const createUser = (email, otp, jwt, otpRepository, userRepository, hashPassword, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch OTP
        const fetchedOtp = yield otpRepository.findOtp(email);
        console.log("fetchedOTP", fetchedOtp);
        if (!fetchedOtp) {
            return next(new errorMiddleware_1.ErrorHandler(404, "OTP not found for the given email"));
        }
        // Check if provided OTP matches the stored OTP
        if (fetchedOtp.otp !== otp) {
            return next(new errorMiddleware_1.ErrorHandler(400, "Invalid OTP"));
        }
        // Hash the password from the OTP entry
        const hashedPassword = yield hashPassword.createHash(fetchedOtp.userPassword);
        const user = {
            name: fetchedOtp.username,
            email: fetchedOtp.email,
            password: hashedPassword,
        };
        // Save user to the user collection DB
        const newUser = yield userRepository.createUser(user);
        const tokens = yield jwt.createAccessAndRefreshToken(newUser.id);
        console.log("tokens ===>", tokens);
        if (newUser) {
            return {
                success: true,
                user: newUser,
                tokens: tokens,
                message: "successfully created user",
            };
        }
    }
    catch (error) {
        return next(new errorMiddleware_1.ErrorHandler(500, "Internal Server Error"));
    }
});
exports.createUser = createUser;
