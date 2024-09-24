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
exports.editComment = void 0;
const editComment = (postId, commentId, userId, updatedComment, postModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModels.findById(postId);
        if (post) {
            const comment = post.comments.find((c) => c._id.toString() === commentId && c.userId.toString() === userId);
            if (comment) {
                comment.comment = updatedComment;
                comment.created_at = new Date();
                yield post.save();
                return comment;
            }
        }
    }
    catch (error) {
        console.error("Error delete post:", error);
        return undefined;
    }
});
exports.editComment = editComment;
