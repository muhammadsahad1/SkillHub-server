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
exports.createProfile = void 0;
const errorMiddleware_1 = require("../../middlewares/errorMiddleware");
const createProfile = (user, file, userRepository, S3Operations, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userRepository.createProfile(user, file, S3Operations);
        if (!updatedUser) {
            return next(new errorMiddleware_1.ErrorHandler(400, "Profile creation failed"));
        }
        return {
            success: true,
            user: updatedUser,
            message: "Profile created successfully."
        };
    }
    catch (error) {
    }
});
exports.createProfile = createProfile;
