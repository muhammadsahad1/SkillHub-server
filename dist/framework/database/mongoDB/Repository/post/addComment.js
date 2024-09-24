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
const errorMiddleware_js_1 = require("../../../../../usecases/middlewares/errorMiddleware.js");
const addComment = (postId, userId, comment, postModels, userModelS) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModelS.findById(userId).select("name");
        if (!user) {
            return new errorMiddleware_js_1.ErrorHandler(404, "user not found");
        }
        const newComment = {
            userId,
            comment: comment,
            userName: user.name,
            createdAt: new Date(),
        };
        const post = yield postModels.findByIdAndUpdate(postId, {
            $push: { comments: newComment },
        }, { new: true });
        console.log("commenPOst =", post);
        return {
            comments: post === null || post === void 0 ? void 0 : post.comments,
            postOwnerId: post === null || post === void 0 ? void 0 : post.userId,
        };
    }
    catch (error) {
        console.error("Error delete post:", error);
        return undefined;
    }
});
exports.addComment = addComment;
