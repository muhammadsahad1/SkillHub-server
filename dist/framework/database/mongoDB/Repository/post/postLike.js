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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLike = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const errorMiddleware_js_1 = require("../../../../../usecases/middlewares/errorMiddleware.js");
const postLike = (userId, postId, postModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdObject = new mongoose_1.default.Types.ObjectId(userId);
        // Check if the post exists
        const post = yield postModels.findById(postId).lean();
        if (!post) {
            return {
                message: "Post not found",
                postId: undefined,
                postUserId: undefined,
            };
        }
        const likesArray = post.likes;
        const alreadyLiked = likesArray.some((id) => id.equals(userIdObject));
        if (alreadyLiked) {
            // Remove the user from the likes array
            yield postModels.findByIdAndUpdate(postId, { $pull: { likes: userIdObject } }, { new: true });
        }
        else {
            // Add the user to the likes array
            yield postModels.findByIdAndUpdate(postId, { $push: { likes: userIdObject } }, { new: true });
        }
        return {
            message: alreadyLiked ? "Post unliked" : "Post liked",
            postId: postId,
            postUserId: post.userId ? post.userId.toString() : undefined, // Convert ObjectId to string if it exists
        };
    }
    catch (error) {
        throw new errorMiddleware_js_1.ErrorHandler(500, error.message);
    }
});
exports.postLike = postLike;
