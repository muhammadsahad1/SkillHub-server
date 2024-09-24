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
exports.fetchMyPosts = void 0;
const fetchMyPosts = (userId, s3, postModels) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield postModels.find({ userId });
    const postWithUrls = yield Promise.all(posts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
        const imageName = post.imageName;
        // returing with postImageUrl
        const postImageUrl = imageName ? yield s3.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: imageName,
        }) : null;
        return Object.assign(Object.assign({}, post.toObject()), { imageUrl: postImageUrl });
    })));
    return postWithUrls;
});
exports.fetchMyPosts = fetchMyPosts;
