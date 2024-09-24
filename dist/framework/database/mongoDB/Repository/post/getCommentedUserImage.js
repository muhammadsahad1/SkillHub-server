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
exports.getCommentedUserImage = void 0;
const errorMiddleware_js_1 = require("../../../../../usecases/middlewares/errorMiddleware.js");
const getCommentedUserImage = (postOwnerId, userId, s3, userModels, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModels.findById(userId);
        // checking the user
        if (!user) {
            return next(new errorMiddleware_js_1.ErrorHandler(404, "User not found"));
        }
        // checking the profileImage
        if (!user.profileImage) {
            return next(new errorMiddleware_js_1.ErrorHandler(404, "Profile image not found"));
        }
        // fetching the resigned Url of users for profileImage
        const userWithImage = yield s3.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: user.profileImage,
        });
        if (!userWithImage) {
            return next(new errorMiddleware_js_1.ErrorHandler(500, "Error retrieving image from S3")); // Handle case where image retrieval fails
        }
        return { postOwnerId: postOwnerId, userWithImage, userId: userId, userName: user.name };
    }
    catch (error) {
        console.error("Error delete post:", error);
        return undefined; // Handle error as needed
    }
});
exports.getCommentedUserImage = getCommentedUserImage;
