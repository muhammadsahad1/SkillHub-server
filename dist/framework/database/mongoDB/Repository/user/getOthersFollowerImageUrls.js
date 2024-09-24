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
exports.getOthersFollowersImageUrls = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const getOthersFollowersImageUrls = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (followers = [], myUserId, userModels, s3) {
    var _a;
    try {
        const myUser = yield userModels.findById(myUserId);
        if (!myUser) {
            throw new Error("Current user not found");
        }
        const followingIds = ((_a = myUser.following) === null || _a === void 0 ? void 0 : _a.map((id) => id.toString())) || [];
        const followersWithImages = yield Promise.all(followers.map((followerId) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const user = yield userModels.findById(followerId);
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
            const isFollowingBack = (_a = user.followers) === null || _a === void 0 ? void 0 : _a.some((id) => {
                if (id instanceof mongoose_1.default.Types.ObjectId) {
                    return id.equals(new mongoose_1.default.Types.ObjectId(myUserId));
                }
                return id.toString() === myUserId;
            });
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
                _id,
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
        return followersWithImages.filter((item) => item !== null);
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
});
exports.getOthersFollowersImageUrls = getOthersFollowersImageUrls;
