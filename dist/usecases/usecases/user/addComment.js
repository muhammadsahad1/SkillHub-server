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
exports.addComment = void 0;
const errorMiddleware_1 = require("../../middlewares/errorMiddleware");
const addComment = (postId, userId, comment, userRepository, s3, io, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retriveComment = yield userRepository.addComment(postId, userId, comment, s3, next);
        console.log("retrivecmt =>", retriveComment);
        if (!retriveComment) {
            return next(new errorMiddleware_1.ErrorHandler(400, "Post is not found"));
        }
        // emiting the comment notification event with socket 
        io.to(`user-${retriveComment.userId}`).emit("notification", {
            retriveComment,
        });
        return {
            success: true,
            message: "Comment added successfully",
            comment: retriveComment,
        };
    }
    catch (error) { }
});
exports.addComment = addComment;
