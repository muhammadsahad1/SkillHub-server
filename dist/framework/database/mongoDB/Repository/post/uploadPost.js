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
exports.uploadPost = void 0;
const uploadPost = (userId, file, caption, type, s3, userModels, postModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageName = "";
        let signedUrl = "";
        if (file) {
            const buffer = file.buffer;
            const mimetype = file.mimetype;
            const originalname = file.originalname;
            const putObjectParams = {
                originalname,
                buffer,
                mimetype,
            };
            // uploading the image to s3 bucket
            imageName = yield s3.putObjectUrl(putObjectParams);
        }
        const newPost = {
            userId: userId,
            imageName: imageName,
            caption: caption || "",
            type: type,
        };
        // here creating post
        const createdPost = yield postModels.create(newPost);
        // retrive the image url in s3
        signedUrl = yield s3.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: imageName,
        });
        const currentUser = yield userModels.findById(userId);
        const skill = currentUser === null || currentUser === void 0 ? void 0 : currentUser.skill;
        const postWithUrl = Object.assign(Object.assign({}, createdPost.toObject()), { signedUrl: signedUrl, skill: skill, userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id });
        // returning the created post and post url
        return postWithUrl;
    }
    catch (error) {
        console.error("Error uploading post:", error);
        return {
            success: false,
            message: "Error uploading post",
            error: error.message,
        };
    }
});
exports.uploadPost = uploadPost;
