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
exports.fetchPosts = void 0;
const POSTS_PER_PAGE = 6; // Number of posts per page
const fetchPosts = (userSkill, pageParam, // This will represent the page number
s3, userModels, postModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch users by skill
        const users = yield userModels
            .find({ skill: userSkill })
            .select("_id profileImage name isProfessional")
            .exec();
        const usersIds = users.map((user) => user === null || user === void 0 ? void 0 : user._id);
        const userPosts = yield postModels
            .find({ userId: { $in: usersIds } })
            .skip((pageParam - 1) * POSTS_PER_PAGE)
            .limit(POSTS_PER_PAGE)
            .sort({ createdAt: -1 })
            .exec();
        // Fetch the total number of posts for pagination logic
        const totalPosts = yield postModels.countDocuments({
            userId: { $in: usersIds },
        });
        const postsWithPostUrl = yield Promise.all(userPosts.map((post) => __awaiter(void 0, void 0, void 0, function* () {
            const user = users.find((u) => (u === null || u === void 0 ? void 0 : u._id.toString()) === post.userId.toString());
            if (!user)
                return null;
            const userImageUrl = (user === null || user === void 0 ? void 0 : user.profileImage)
                ? yield s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: user === null || user === void 0 ? void 0 : user.profileImage,
                })
                : null;
            const postImageUrl = post.imageName
                ? yield s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: post.imageName,
                })
                : null;
            const commentedUserProfileUrls = yield Promise.all(post === null || post === void 0 ? void 0 : post.comments.map((comment) => __awaiter(void 0, void 0, void 0, function* () {
                const userImageName = yield userModels.findById(comment.userId);
                if (!userImageName)
                    return null;
                const commentedUserProfileUrl = yield s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: userImageName.profileImage ? userImageName.profileImage : "",
                });
                return Object.assign(Object.assign({}, comment.toObject()), { commentedUserProfileUrl });
            })));
            return Object.assign(Object.assign({}, post.toObject()), { userImageUrl,
                postImageUrl, userName: (user === null || user === void 0 ? void 0 : user.name) || "", isProfessional: (user === null || user === void 0 ? void 0 : user.isProfessional) ? true : false, comments: commentedUserProfileUrls.filter((comment) => comment !== null) });
        })));
        return {
            success: true,
            message: "Posts fetched successfully",
            posts: postsWithPostUrl.filter((post) => post !== null),
            hasMore: pageParam * POSTS_PER_PAGE < totalPosts, // Check if there are more pages
        };
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return {
            success: false,
            message: "Error fetching posts",
            posts: [],
        };
    }
});
exports.fetchPosts = fetchPosts;
