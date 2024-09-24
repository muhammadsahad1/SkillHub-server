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
exports.fetchOthersPosts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const fetchOthersPosts = (userId, s3, postModels, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const userPosts = yield postModels.find({ userId: userID });
        const user = yield userModels.findById(userId);
        const profileImageUrl = (user === null || user === void 0 ? void 0 : user.profileImage)
            ? yield s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME || "",
                key: user.profileImage,
            })
            : null;
        // Retrieving the posts with images from the S3 bucket or other types
        const postsWithImage = yield Promise.all(userPosts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
            if (post.type === "image") {
                const postUrl = post.imageName
                    ? yield s3.getObjectUrl({
                        bucket: process.env.C3_BUCKET_NAME || "",
                        key: post.imageName,
                    })
                    : null;
                return Object.assign(Object.assign({}, post.toObject()), { postUrl,
                    profileImageUrl, userName: user === null || user === void 0 ? void 0 : user.name });
            }
            else {
                return Object.assign(Object.assign({}, post.toObject()), { profileImageUrl, userName: user === null || user === void 0 ? void 0 : user.name });
            }
        })));
        console.log("Fetched posts:", postsWithImage);
        return postsWithImage;
    }
    catch (error) {
        console.error("Error fetching others' posts:", error);
        return undefined; // Handle error as needed
    }
});
exports.fetchOthersPosts = fetchOthersPosts;
