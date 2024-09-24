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
exports.UserUseCase = void 0;
const index_js_1 = require("./user/index.js");
const resentOtp_js_1 = require("./user/resentOtp.js");
const errorMiddleware_js_1 = require("../middlewares/errorMiddleware.js");
// ================================= User use cases ================================= \\
class UserUseCase {
    constructor(userRepostory, Jwt, otpRepository, hashPassword, otpGenerate, sendEmail, s3, elasticSearchService, io, notification) {
        this.userRepostory = userRepostory;
        this.Jwt = Jwt;
        this.otpRepository = otpRepository;
        this.hashPassword = hashPassword;
        this.otpGenerate = otpGenerate;
        this.sendEmail = sendEmail;
        this.s3 = s3;
        this.elasticSearchService = elasticSearchService;
        this.io = io;
        this.notification = notification;
    }
    // ===================================================================>
    userSignup(user, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = yield (0, index_js_1.userSignup)(this.Jwt, this.otpRepository, this.userRepostory, this.otpGenerate, this.hashPassword, user, this.sendEmail, next);
                return token;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // ===================================================================>
    createUser(email, otp, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newuser = yield (0, index_js_1.createUser)(email, otp, this.Jwt, this.otpRepository, this.userRepostory, this.hashPassword, next);
            return newuser;
        });
    }
    // ===================================================================>
    resendOtp(email, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, resentOtp_js_1.resentOtp)(this.otpGenerate, this.otpRepository, this.sendEmail, email, next);
        });
    }
    // ===================================================================>
    login(user, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokens = yield (0, index_js_1.login)(this.userRepostory, this.Jwt, this.hashPassword, user.email, user.password, user.picture, next);
            return tokens;
        });
    }
    // ===================================================================>
    forgotPassword(email, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.forgotPassword)(this.Jwt, this.userRepostory, this.sendEmail, email, next);
            if (!result) {
                return next(new errorMiddleware_js_1.ErrorHandler(400, "user reset password updated failed"));
            }
            return result;
        });
    }
    // ===================================================================>
    resetPassword(password, resetToken, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.resetPassword)(password, resetToken, this.userRepostory, this.hashPassword, next);
            if (!result) {
                return next(new errorMiddleware_js_1.ErrorHandler(400, "User is founded"));
            }
            return result;
        });
    }
    // ===================================================================>
    getUser(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.getUser)(userId, this.userRepostory, next);
            if (!result) {
                return next(new errorMiddleware_js_1.ErrorHandler(400, "User is founded"));
            }
            return result;
        });
    }
    // ===================================================================>
    changePassword(userId, currentPassword, newPassword, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.changePassword)(userId, currentPassword, newPassword, this.hashPassword, this.userRepostory, next);
            if (!result) {
                return next(new errorMiddleware_js_1.ErrorHandler(400, "User is founded"));
            }
            return result;
        });
    }
    // ===================================================================>
    // Use Case
    createProfile(user, file, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("File data in use case:", file);
                const result = yield (0, index_js_1.createProfile)(user, file, this.userRepostory, this.s3, next);
                if (!result) {
                    return next(new errorMiddleware_js_1.ErrorHandler(400, "Profile update failed"));
                }
                return result;
            }
            catch (error) {
                console.error("Error in createProfile use case:", error);
                return next(new errorMiddleware_js_1.ErrorHandler(500, "Internal Server Error"));
            }
        });
    }
    //verify requesting
    verifyRequest(userId, requestData, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.verifyRequest)(userId, requestData, this.userRepostory, next);
        });
    }
    // upload cover image
    uploadCoverImage(userId, file, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.coverImageUpload)(userId, file, this.s3, this.userRepostory, next);
            if (!result) {
                return next(new errorMiddleware_js_1.ErrorHandler(400, "User is founded"));
            }
            if (result) {
                console.log(" userCase ===>", result);
                return result;
            }
        });
    }
    // ===================================================================>
    getProfileImage(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.getProfileImage)(userId, this.userRepostory, this.s3, next);
            if (!result) {
                return next(new errorMiddleware_js_1.ErrorHandler(400, "User is founded"));
            }
            return result;
        });
    }
    // ===================================================================>
    //change password
    changePrivacy(userId, isPrivacy, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.changePrivacy)(userId, isPrivacy, this.userRepostory, next);
            if (!result) {
                return next(new errorMiddleware_js_1.ErrorHandler(400, "Change privacy failed"));
            }
            return result;
        });
    }
    // ===================================================================>
    //change password
    showNotification(userId, isShowNotification, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.changeShowNotification)(userId, isShowNotification, this.userRepostory, next);
            console.log("resss=>", result);
            return result;
        });
    }
    // ===================================================================>
    getSkillRelatedUsers(userId, skill, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getSkillRelatedUsers)(userId, skill, this.userRepostory, this.s3, next);
        });
    }
    // ===================================================================>
    getUserDetails(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.getUserDetails)(userId, this.s3, this.userRepostory, next);
            if (!result) {
                return next(new errorMiddleware_js_1.ErrorHandler(400, "fetch user failed"));
            }
            return {
                success: true,
                user: result,
            };
        });
    }
    // ===================================================================>
    userFollowUp(toFollowingId, fromFollowerId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, index_js_1.followUp)(toFollowingId, fromFollowerId, this.userRepostory, next);
        });
    }
    // ===================================================================>
    getMyFollowings(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getMyFollowings)(userId, this.userRepostory, this.s3, next);
        });
    }
    // ===================================================================>
    myFollowers(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.myFollowers)(userId, this.s3, this.userRepostory, next);
        });
    }
    // ===================================================================>
    unFollow(toUnfollowId, fromFollowerId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.unFollow)(toUnfollowId, fromFollowerId, this.userRepostory, this.notification, next);
        });
    }
    // ===================================================================>
    removeFollower(fromRemoverId, toRemoveId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.removeFollower)(fromRemoverId, toRemoveId, this.userRepostory, next);
        });
    }
    followBack(toFollowId, fromFollowingId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.followBack)(toFollowId, fromFollowingId, this.userRepostory, next);
        });
    }
    othersFollowers(userId, currentUserId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.othersFollowers)(userId, currentUserId, this.userRepostory, this.s3, next);
        });
    }
    othersFollowings(userId, currentUserId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.othersFollowings)(userId, currentUserId, this.userRepostory, this.s3, next);
        });
    }
    uploadPost(userId, imageUrl, caption, type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.uploadPostandRetriveUrl)(userId, imageUrl, caption, type, this.s3, this.userRepostory);
        });
    }
    uploadThoughts(userId, thoughts, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.uploadThoughts)(userId, thoughts, this.userRepostory, next);
        });
    }
    fetchPosts(userSkill, pageParam, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getPosts)(userSkill, pageParam, this.s3, this.userRepostory, next);
        });
    }
    fetchMyPosts(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.fetchMyPosts)(userId, this.userRepostory, this.s3, next);
        });
    }
    postView(postId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.postView)(postId, this.userRepostory, this.s3, next);
        });
    }
    fetchOthersPosts(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.fetchOthersPosts)(userId, this.userRepostory, this.s3, next);
        });
    }
    deletePost(postId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.deletePost)(postId, this.userRepostory, next);
        });
    }
    editPost(editedCaption, postId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.editPost)(editedCaption, postId, this.userRepostory, next);
        });
    }
    postLike(userId, postId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.postLike)(userId, postId, this.userRepostory, this.notification, next);
        });
    }
    addComment(postId, userId, comment, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.addComment)(postId, userId, comment, this.userRepostory, this.s3, this.io, next);
        });
    }
    delteComment(postId, commentId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.deleteComment)(postId, commentId, this.userRepostory, next);
        });
    }
    editingComment(postId, commentId, userId, updateComment, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.editingComment)(postId, commentId, userId, updateComment, this.userRepostory, next);
        });
    }
    searchUsers(query, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.searchUsers)(query, this.elasticSearchService, this.s3, next);
        });
    }
    reportPost(postId, reason, userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.reportPost)(postId, reason, userId, this.userRepostory, next);
        });
    }
}
exports.UserUseCase = UserUseCase;
