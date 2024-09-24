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
exports.UserRepository = void 0;
const index_js_1 = require("./user/index.js");
const index_js_2 = require("./post/index.js");
//Passing the user properties to DB intraction function with userModel/schema
class UserRepository {
    constructor(userModels, postModels, verificationRequestModal, requestModel) {
        this.userModels = userModels;
        this.postModels = postModels;
        this.verificationRequestModal = verificationRequestModal;
        this.requestModel = requestModel;
    }
    // ===================================================================>
    createProfile(userProfile, file, S3Operations) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.createProfile)(userProfile, file, S3Operations, this.userModels);
        });
    }
    // ===================================================================>
    verifyRequest(userId, requestData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.verifyRequest)(userId, requestData, this.verificationRequestModal, this.userModels);
        });
    }
    // ===================================================================>
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.createUser)(newUser, this.userModels);
        });
    }
    // ===================================================================>
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.findByEmail)(this.userModels, email);
        });
    }
    // ===================================================================>
    findByEmailUpdateOne(email, picture) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.findByEmailUpdatePicture)(this.userModels, email, picture);
        });
    }
    // ===================================================================>
    findOneUpdateResetToken(email, resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const resInfisrt = yield (0, index_js_1.findUpdateResetToken)(this.userModels, email, resetToken);
            return resInfisrt;
        });
    }
    // ===================================================================>
    getSkillRelatedUsers(userId, skill, s3Bucket) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield (0, index_js_1.getSkillRelatedUsers)(userId, skill, this.userModels);
            if (!users || users.length === 0) {
                return [];
            }
            const res = yield (0, index_js_1.getUsersImageUrls)(users, [], s3Bucket);
            return res;
        });
    }
    // ===================================================================>
    getUserDetails(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getUserDetails)(userId, this.userModels);
        });
    }
    // ===================================================================>
    resetPasswordVerify(password, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.resetPasswordVerify)(this.userModels, password, token);
        });
    }
    // ===================================================================>
    fetchProfileImage(S3Operations, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.fetchProfileImage)(this.userModels, S3Operations, userId);
        });
    }
    // cover image upload
    uploadeCoverImage(userId, file, S3Operations) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.uploadCoverImage)(this.userModels, userId, file, S3Operations);
        });
    }
    // ===================================================================>
    findByIdUpdateUpdateOne(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.changePassword)(this.userModels, userId, password);
        });
    }
    // ===================================================================>
    changeShowNotification(userId, isShowNotification) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.showNotification)(userId, isShowNotification, this.userModels);
        });
    }
    // ===================================================================>
    followUp(toFollowingId, fromFollowerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, index_js_1.followUp)(toFollowingId, fromFollowerId, this.userModels);
        });
    }
    // ===================================================================>
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getUser)(this.userModels, userId);
        });
    }
    getMyFollowing(userId, S3Operations) {
        return __awaiter(this, void 0, void 0, function* () {
            const followingUsers = yield (0, index_js_1.getMyFollowing)(userId, this.userModels, S3Operations);
            if (!followingUsers || followingUsers.length === 0) {
                return [];
            }
            const followingUsersWithImage = yield (0, index_js_1.getUsersImageUrls)(followingUsers, [], S3Operations);
            return followingUsersWithImage;
        });
    }
    // ===================================================================>
    unFollow(toUnFollowId, fromFollowerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.unFollow)(toUnFollowId, fromFollowerId, this.userModels);
        });
    }
    myFollowers(userId, S3Operations) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.myFollowers)(userId, this.userModels);
            if (!result) {
                return [];
            }
            const { followersUsers, following } = result;
            if (!followersUsers || (followersUsers === null || followersUsers === void 0 ? void 0 : followersUsers.length) === 0) {
                return [];
            }
            const followersUsersWithImage = yield (0, index_js_1.getUsersImageUrls)(followersUsers, following, S3Operations);
            return followersUsersWithImage;
        });
    }
    // ===================================================================>
    removeFollower(fromRemoverId, toRemoveId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.removeFollower)(fromRemoverId, toRemoveId, this.userModels);
        });
    }
    // ===================================================================>
    followBack(fromFollowingId, toFollowId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.followBack)(fromFollowingId, toFollowId, this.userModels);
        });
    }
    // ===================================================================>
    othersFollowers(userId, currentUserId, S3Operations) {
        return __awaiter(this, void 0, void 0, function* () {
            const followers = yield (0, index_js_1.getOthersFollowers)(userId, this.userModels);
            if (!followers || (followers === null || followers === void 0 ? void 0 : followers.length) === 0) {
                return [];
            }
            return yield (0, index_js_1.getOthersFollowersImageUrls)(followers, currentUserId, this.userModels, S3Operations);
        });
    }
    othersFollowings(userId, currentUserId, s3) {
        return __awaiter(this, void 0, void 0, function* () {
            const followings = yield (0, index_js_1.getOthersFollowings)(userId, this.userModels);
            if (!followings || (followings === null || followings === void 0 ? void 0 : followings.length) === 0) {
                return [];
            }
            return yield (0, index_js_1.getOthersFollowingsImageUrl)(followings, currentUserId, this.userModels, s3);
        });
    }
    uploadPostRetriveImageUrl(userId, file, caption, type, s3) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.uploadPost)(userId, file, caption, type, s3, this.userModels, this.postModels);
        });
    }
    // ===================================================================>
    uploadThoughts(userId, thoughts) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.uploadThoughts)(userId, thoughts, this.postModels);
        });
    }
    // ===================================================================>
    fetchPosts(userSkill, pageParam, s3) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.fetchPosts)(userSkill, pageParam, s3, this.userModels, this.postModels);
        });
    }
    // ===================================================================>
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.deletePost)(postId, this.postModels);
        });
    }
    editPost(caption, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.editPost)(caption, postId, this.postModels);
        });
    }
    postLike(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.postLike)(userId, postId, this.postModels);
        });
    }
    addComment(postId, userId, comment, s3, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newComment = yield (0, index_js_2.addComment)(postId, userId, comment, this.postModels, this.userModels);
            if (!newComment) {
                return [];
            }
            const newFirstComment = newComment === null || newComment === void 0 ? void 0 : newComment.comments[0];
            const userIdToFetch = newFirstComment.userId.toString();
            const postOwnerId = newComment === null || newComment === void 0 ? void 0 : newComment.postOwnerId;
            return yield (0, index_js_2.getCommentedUserImage)(postOwnerId, userIdToFetch, s3, this.userModels, next);
        });
    }
    fetchMyPosts(userId, s3) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.fetchMyPosts)(userId, s3, this.postModels);
        });
    }
    fetchOthersPosts(userId, s3) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.fetchOthersPosts)(userId, s3, this.postModels, this.userModels);
        });
    }
    postView(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.postView)(postId, this.postModels);
        });
    }
    editComment(postId, commentId, userId, updatedComment) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.editComment)(postId, commentId, userId, updatedComment, this.postModels);
        });
    }
    deleteComment(postId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.deleteComment)(postId, commentId, this.postModels);
        });
    }
    changePrivacy(userId, isPrivacy) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.changePrivacy)(userId, isPrivacy, this.userModels);
        });
    }
    reportPost(postId, reason, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_2.reportPost)(postId, reason, userId, this.postModels, this.requestModel);
        });
    }
    getAllUsers() {
        throw new Error("Method not implemented.");
    }
    // ===================================================================>
    blockUser(id) {
        throw new Error("Method not implemented.");
    }
}
exports.UserRepository = UserRepository;
