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
exports.postView = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const postView = (postId, userRepository, s3, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userRepository.postView(postId);
        if (!result) {
            return next(new errorMiddleware_js_1.ErrorHandler(401, "Post does not exist"));
        }
        const postObject = result.toObject();
        const postImageUrl = result.imageName
            ? yield s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: result.imageName,
            })
            : null;
        console.log("URL =>", postImageUrl);
        // Combine the result with the image URL
        postObject.imageUrl = postImageUrl;
        return postObject;
    }
    catch (error) { }
});
exports.postView = postView;
