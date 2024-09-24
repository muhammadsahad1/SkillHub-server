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
exports.adminLogin = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const adminLogin = (email, password, jwt, hashedPassword, adminRepository, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield adminRepository.adminLogin(email);
    // ensure admin
    if ((admin === null || admin === void 0 ? void 0 : admin.role) === "user") {
        return next(new errorMiddleware_js_1.ErrorHandler(403, "Not authorized"));
    }
    else {
        // campare for ensure the admin password
        const match = yield hashedPassword.comparePassword(password, admin === null || admin === void 0 ? void 0 : admin.password);
        if (!match) {
            return next(new errorMiddleware_js_1.ErrorHandler(401, "Invalid email or password"));
        }
        // generating token
        const Tokens = yield jwt.createAccessAndRefreshToken(admin === null || admin === void 0 ? void 0 : admin._id);
        return {
            success: true,
            tokens: Tokens,
            message: "successfully authorized admin",
            admin: {
                _id: admin === null || admin === void 0 ? void 0 : admin._id,
                email: admin === null || admin === void 0 ? void 0 : admin.email,
            },
        };
    }
});
exports.adminLogin = adminLogin;
