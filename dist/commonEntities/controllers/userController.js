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
exports.UserController = void 0;
const jwt_1 = require("../../framework/webServer/middleware/jwt");
const errorMiddleware_1 = require("../../usecases/middlewares/errorMiddleware");
const httpStatus_1 = __importDefault(require("../status/httpStatus"));
// ===================================== User Controller ================================= //
class UserController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
    }
    // ===================================================================>
    // User signup
    userSignup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userUseCase.userSignup(req.body, next);
                res.status(httpStatus_1.default.OK).json(response);
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // Creating user
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userUseCase.createUser(req.body.email, req.body.verifyCode, next);
                const { accessToken, refreshToken } = result === null || result === void 0 ? void 0 : result.tokens;
                res.cookie("accessToken", accessToken, jwt_1.accessTokenOption);
                res.cookie("refreshToken", refreshToken, jwt_1.refreshTokenOption);
                res.cookie("role", "user", jwt_1.roleOptions);
                res.status(httpStatus_1.default.CREATED).json(result); // Use httpStatus.CREATED (201)
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // Resent OTP
    resentOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.userUseCase.resendOtp(email, next);
                res
                    .status(httpStatus_1.default.OK)
                    .json({ success: true, message: "Resent OTP to your email" }); // Use httpStatus.OK
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // Login and JWT token creation
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userUseCase.login(req.body, next);
                if (result) {
                    const { accessToken, refreshToken } = result === null || result === void 0 ? void 0 : result.tokens;
                    res.cookie("accessToken", accessToken, jwt_1.accessTokenOption);
                    res.cookie("refreshToken", refreshToken, jwt_1.refreshTokenOption);
                    res.cookie("role", "user", jwt_1.roleOptions);
                    res.status(httpStatus_1.default.OK).json({
                        user: result.fetchUser,
                        message: "User logged in successfully",
                        success: true,
                        role: "user",
                        accessToken,
                        refreshToken,
                    });
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // Forgot password update
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const result = yield this.userUseCase.forgotPassword(email, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result); // Use httpStatus.OK
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // Reset password
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userUseCase.resetPassword(req.body.password, req.body.resetToken, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result); // Use httpStatus.OK
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // Get skill-related users
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const skill = req.query.skill;
                const result = yield this.userUseCase.getSkillRelatedUsers((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, skill, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result); // Use httpStatus.OK
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // Google login
    googleLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userUseCase.login(req.body, next);
                if (result) {
                    const { accessToken, refreshToken } = result.tokens;
                    res.cookie("accessToken", accessToken, jwt_1.accessTokenOption);
                    res.cookie("refreshToken", refreshToken, jwt_1.refreshTokenOption);
                    res.cookie("role", "user", jwt_1.roleOptions);
                    res.status(httpStatus_1.default.OK).json({
                        user: result.fetchUser,
                        message: "User logged in successfully",
                        success: true,
                        role: "user",
                        accessToken,
                        refreshToken,
                    });
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // Change password
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userUseCase.changePassword((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.body.currentPassword, req.body.newPassword, next);
                res.status(httpStatus_1.default.OK).json(result); // Use httpStatus.OK
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // Create profile
    createProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userUseCase.createProfile(req.body, req.file, next);
                if (result) {
                    res.status(httpStatus_1.default.CREATED).json({
                        user: result.user,
                        message: "Profile created successfully",
                        success: true,
                        role: "user",
                    });
                }
                else {
                    return next(new errorMiddleware_1.ErrorHandler(httpStatus_1.default.BAD_REQUEST, "Profile creation failed"));
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // Verify request for professional account
    verifyRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield this.userUseCase.verifyRequest(userId, req.body, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result); // Use httpStatus.OK
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status || httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ===================================================================>
    // upload Cover Image
    uploadCoverimage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userUseCase.uploadCoverImage((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.file, next);
                if (!result) {
                    console.log("result did not come");
                }
                console.log("sfkjdfjsdkljsdljs");
                console.log("result from userUseCase =>", result);
                res.status(httpStatus_1.default.OK).json({
                    success: true,
                    message: "Cover image uploaded successfully",
                    user: result,
                });
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // getProfileImage
    getProfileImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userUseCase.getProfileImage((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
                console.log("this result is going", result);
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    changePrivacy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userUseCase.changePrivacy((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.body.isPrivacy, next);
                if (result) {
                    res.status(httpStatus_1.default.CREATED).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // change notification settings
    showNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userUseCase.showNotification((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.body.isShowNotification, next);
                if (result) {
                    res.status(httpStatus_1.default.CREATED).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    getUserDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userUseCase.getUserDetails((_a = req.query) === null || _a === void 0 ? void 0 : _a.userId, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    userFollowUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userUseCase.userFollowUp(req.body.toFollowingId, req.body.fromFollowerId, next);
                res
                    .status(httpStatus_1.default.OK)
                    .json({ success: "successfully updated the following" });
            }
            catch (error) {
                res
                    .status(httpStatus_1.default.INTERNAL_SERVER_ERROR)
                    .json({ success: false, message: "Failed to follow user" });
            }
        });
    }
    getMyFollowings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userUseCase.getMyFollowings((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // myFollowers
    myFollowers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield this.userUseCase.myFollowers(userId, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // Unfollow
    unFollow(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { toUnFollowId, fromFollowerId } = req.body;
                const result = yield this.userUseCase.unFollow(toUnFollowId, fromFollowerId, next);
                console.log("result of unfollow user =>", result);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    removeFollower(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { toRemoveId } = req.body;
                const result = yield this.userUseCase.removeFollower((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, toRemoveId, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // followBack
    followback(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { toFollowId } = req.body;
                const result = yield this.userUseCase.followBack((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, toFollowId, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Uploading post
    uploadPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userUseCase.uploadPost((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.file, req.body.caption, req.body.type);
                if (result.success) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
                else {
                    res.status(httpStatus_1.default.BAD_REQUEST).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    uploadThoughts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log("body =>", req.body);
                const { thoughts } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield this.userUseCase.uploadThoughts(userId, thoughts, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // fetching the posts
    fetchPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const pageParam = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.pageParam) ? Number(req.query.pageParam) : 1;
                const result = yield this.userUseCase.fetchPosts((_b = req.query) === null || _b === void 0 ? void 0 : _b.skill, pageParam, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Delete post
    deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userUseCase.deletePost((_a = req.query) === null || _a === void 0 ? void 0 : _a.postId, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // One post
    postView(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.query;
                const result = yield this.userUseCase.postView(postId, next);
                res.status(httpStatus_1.default.OK).json(result);
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Post edit
    editPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, caption } = req.body;
                const result = yield this.userUseCase.editPost(caption, id, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Post like
    postLike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { postId } = req.body;
                const result = yield this.userUseCase.postLike((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, postId, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Comment post
    addComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { postId, comment } = req.body;
                const result = yield this.userUseCase.addComment(postId, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, comment, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Deleting comment
    deleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId, postId } = req.body;
                const result = yield this.userUseCase.delteComment(postId, commentId, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Editing comment
    editingComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { commentId, postId, updatedText } = req.body.data;
                const result = yield this.userUseCase.editingComment(postId, commentId, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, updatedText, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Fetch my posts
    fetchMyPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userUseCase.fetchMyPosts((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Fetch other followers
    fetchOtherFollowers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = req.query.userId;
                const result = yield this.userUseCase.othersFollowers(userId, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Fetch other followings
    fetchOtherFollowings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = req.query.userId;
                const result = yield this.userUseCase.othersFollowings(userId, (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Fetch others posts
    fetchOthersPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.query;
                const result = yield this.userUseCase.fetchOthersPosts(userId, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Search users with elastic search
    searchUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query.query;
                const result = yield this.userUseCase.searchUsers(query, next);
                res.status(httpStatus_1.default.OK).json(result);
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Logout User
    userLogout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("accessToken", jwt_1.accessTokenOption);
                res.clearCookie("role", jwt_1.roleOptions);
                res
                    .status(httpStatus_1.default.OK)
                    .json({ success: true, message: "Successfully logged out" });
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ===================================================================>
    // Report post
    reportPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { postId, reason } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield this.userUseCase.reportPost(postId, reason, userId, next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
}
exports.UserController = UserController;
