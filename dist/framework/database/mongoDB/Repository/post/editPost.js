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
exports.editPost = void 0;
const editPost = (caption, postId, postModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editedPost = yield postModels.findByIdAndUpdate({ _id: postId }, {
            $set: {
                caption: caption,
            },
        }, { new: true });
        return {
            postId: editedPost === null || editedPost === void 0 ? void 0 : editedPost._id.toString(),
            caption: editedPost === null || editedPost === void 0 ? void 0 : editedPost.caption,
        };
    }
    catch (error) {
        console.error("Error delete post:", error);
    }
});
exports.editPost = editPost;
