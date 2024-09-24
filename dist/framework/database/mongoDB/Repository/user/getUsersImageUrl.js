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
exports.getUsersImageUrls = void 0;
const getUsersImageUrls = (users_1, ...args_1) => __awaiter(void 0, [users_1, ...args_1], void 0, function* (users, followings = [], s3) {
    try {
        const followingIds = followings.map((id) => id.toString());
        const userWithImages = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const { _id: _id, name, bio, country, skill, profileImage: profileImage, coverImage: coverImage, } = user;
            let imageUrl = "";
            let coverImageUrl = "";
            if (profileImage) {
                imageUrl = yield s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: profileImage,
                });
            }
            if (coverImage) {
                coverImageUrl = yield s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: coverImage,
                });
            }
            let isFollowingBack = followingIds.includes(_id.toString());
            // returning the home page userSkillReleted data
            return {
                _id,
                name,
                country,
                bio,
                skill,
                imageUrl,
                coverImageUrl,
                isFollowingBack,
            };
        })));
        return userWithImages;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
});
exports.getUsersImageUrls = getUsersImageUrls;
