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
exports.fetchProfileImage = void 0;
const fetchProfileImage = (userModels, s3, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // fetching user's profileImage Name for fetch from S31bucket
        const findUser = yield userModels.findById({ _id: userId });
        const followersCount = (_a = findUser === null || findUser === void 0 ? void 0 : findUser.followers) === null || _a === void 0 ? void 0 : _a.length;
        const followingsCount = (_b = findUser === null || findUser === void 0 ? void 0 : findUser.following) === null || _b === void 0 ? void 0 : _b.length;
        const profileImgName = findUser === null || findUser === void 0 ? void 0 : findUser.profileImage;
        const coverImageName = findUser === null || findUser === void 0 ? void 0 : findUser.coverImage;
        // here we got the IMAGE URL
        let imageUrl;
        let coverImageUrl;
        if (profileImgName) {
            imageUrl = yield s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: profileImgName,
            });
        }
        if (coverImageName) {
            coverImageUrl = yield s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: coverImageName,
            });
        }
        console.log("called fetchImage");
        return { imageUrl, coverImageUrl, followersCount, followingsCount };
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
});
exports.fetchProfileImage = fetchProfileImage;
