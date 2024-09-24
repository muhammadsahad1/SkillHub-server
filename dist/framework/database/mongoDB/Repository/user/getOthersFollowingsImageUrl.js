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
exports.getOthersFollowingsImageUrl = void 0;
const getOthersFollowingsImageUrl = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (followings = [], myUserId, userModels, s3) {
    var _a, _b;
    try {
        const myUser = yield userModels.findById(myUserId);
        if (!myUser) {
            throw new Error("Current user not found");
        }
        const followersIds = ((_a = myUser.followers) === null || _a === void 0 ? void 0 : _a.map((id) => id.toString())) || [];
        const followingIds = ((_b = myUser.following) === null || _b === void 0 ? void 0 : _b.map((id) => id.toString())) || [];
        const followingsWithImage = yield Promise.all(followings.map((followingId) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield userModels.findById(followingId);
            if (!user) {
                return null;
            }
            const { _id, name, skill, country, profileImage, coverImage } = user;
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
            const isFollowing = followingIds.includes(_id.toString());
            const isFollowingBack = followersIds.includes(_id.toString());
            let relationship = "none";
            if (isFollowing && isFollowingBack) {
                relationship = "mutual";
            }
            else if (isFollowing) {
                relationship = "following";
            }
            else if (isFollowingBack) {
                relationship = "followed by";
            }
            return {
                _id: _id.toString(),
                name,
                skill,
                country,
                imageUrl,
                coverImageUrl,
                isFollowing,
                isFollowingBack,
                relationship,
            };
        })));
        console.log("followingsWithImage ======>", followingsWithImage);
        return followingsWithImage.filter((item) => item !== null);
    }
    catch (error) {
        console.error("Error fetching followings' images:", error);
        return undefined;
    }
});
exports.getOthersFollowingsImageUrl = getOthersFollowingsImageUrl;
