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
exports.changePassword = void 0;
const errorMiddleware_1 = require("../../middlewares/errorMiddleware");
const changePassword = (userId, currentPassword, newPassword, hashPassword, userRepository, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("kerii");
        const user = yield userRepository.getUser(userId);
        if (!user) {
            return next(new errorMiddleware_1.ErrorHandler(400, "User is not found"));
        }
        const compare = yield hashPassword.comparePassword(currentPassword, user === null || user === void 0 ? void 0 : user.password);
        if (!compare) {
            return { success: false, message: "Current password is incorrect" };
        }
        const hashedPassword = yield hashPassword.createHash(currentPassword);
        yield userRepository.findByIdUpdateUpdateOne(userId, hashedPassword);
        return {
            success: true,
            message: "Pasword changed successfully",
        };
    }
    catch (error) {
        return next(new errorMiddleware_1.ErrorHandler(500, "Internal Server Error"));
    }
});
exports.changePassword = changePassword;
