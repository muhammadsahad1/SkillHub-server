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
exports.login = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const login = (userRepository, jwt, hashedPassword, email, password, picture, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fetchUser = yield userRepository.findByEmail(email);
        if (!fetchUser) {
            return next(new errorMiddleware_js_1.ErrorHandler(400, "User does not exist"));
        }
        console.log("fetchUser ", fetchUser);
        if (picture) {
            fetchUser = yield userRepository.findByEmailUpdateOne(email, picture);
            const tokens = yield jwt.createAccessAndRefreshToken(fetchUser === null || fetchUser === void 0 ? void 0 : fetchUser.id);
            return { fetchUser, tokens };
        }
        if (!fetchUser) {
            return next(new errorMiddleware_js_1.ErrorHandler(400, "User does not exist"));
        }
        if (fetchUser.blocked) {
            return next(new errorMiddleware_js_1.ErrorHandler(400, "Your account has been blocked"));
        }
        const checked = yield hashedPassword.comparePassword(password, fetchUser.password);
        if (!checked) {
            return next(new errorMiddleware_js_1.ErrorHandler(400, "Invalid password"));
        }
        const tokens = yield jwt.createAccessAndRefreshToken(fetchUser.id);
        return { fetchUser, tokens };
    }
    catch (error) {
        return next(new errorMiddleware_js_1.ErrorHandler(500, "An error occurred during login"));
    }
});
exports.login = login;
