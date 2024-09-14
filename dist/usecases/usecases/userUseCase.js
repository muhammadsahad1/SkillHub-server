import { userSignup, createUser, login, createProfile, resetPassword, forgotPassword, getProfileImage, changePassword, getUser, coverImageUpload, changePrivacy, changeShowNotification, getSkillRelatedUsers, getUserDetails, followUp, getMyFollowings, unFollow, myFollowers, removeFollower, followBack, uploadPostandRetriveUrl, getPosts, deletePost, editPost, postLike, fetchMyPosts, othersFollowers, othersFollowings, addComment, deleteComment, editingComment, fetchOthersPosts, searchUsers, postView, uploadThoughts, verifyRequest, reportPost, } from "./user/index";
import { resentOtp } from "./user/resentOtp";
import { ErrorHandler } from "../middlewares/errorMiddleware";
// ================================= User use cases ================================= \\
export class UserUseCase {
    userRepostory;
    Jwt;
    otpRepository;
    hashPassword;
    otpGenerate;
    sendEmail;
    s3;
    elasticSearchService;
    io;
    notification;
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
    async userSignup(user, next) {
        try {
            let token = await userSignup(this.Jwt, this.otpRepository, this.userRepostory, this.otpGenerate, this.hashPassword, user, this.sendEmail, next);
            return token;
        }
        catch (error) {
            console.log(error);
        }
    }
    // ===================================================================>
    async createUser(email, otp, next) {
        const newuser = await createUser(email, otp, this.Jwt, this.otpRepository, this.userRepostory, this.hashPassword, next);
        return newuser;
    }
    // ===================================================================>
    async resendOtp(email, next) {
        await resentOtp(this.otpGenerate, this.otpRepository, this.sendEmail, email, next);
    }
    // ===================================================================>
    async login(user, next) {
        const tokens = await login(this.userRepostory, this.Jwt, this.hashPassword, user.email, user.password, user.picture, next);
        return tokens;
    }
    // ===================================================================>
    async forgotPassword(email, next) {
        const result = await forgotPassword(this.Jwt, this.userRepostory, this.sendEmail, email, next);
        if (!result) {
            return next(new ErrorHandler(400, "user reset password updated failed"));
        }
        return result;
    }
    // ===================================================================>
    async resetPassword(password, resetToken, next) {
        const result = await resetPassword(password, resetToken, this.userRepostory, this.hashPassword, next);
        if (!result) {
            return next(new ErrorHandler(400, "User is founded"));
        }
        return result;
    }
    // ===================================================================>
    async getUser(userId, next) {
        const result = await getUser(userId, this.userRepostory, next);
        if (!result) {
            return next(new ErrorHandler(400, "User is founded"));
        }
        return result;
    }
    // ===================================================================>
    async changePassword(userId, currentPassword, newPassword, next) {
        const result = await changePassword(userId, currentPassword, newPassword, this.hashPassword, this.userRepostory, next);
        if (!result) {
            return next(new ErrorHandler(400, "User is founded"));
        }
        return result;
    }
    // ===================================================================>
    // Use Case
    async createProfile(user, file, next) {
        try {
            console.log("File data in use case:", file);
            const result = await createProfile(user, file, this.userRepostory, this.s3, next);
            if (!result) {
                return next(new ErrorHandler(400, "Profile update failed"));
            }
            return result;
        }
        catch (error) {
            console.error("Error in createProfile use case:", error);
            return next(new ErrorHandler(500, "Internal Server Error"));
        }
    }
    //verify requesting
    async verifyRequest(userId, requestData, next) {
        return await verifyRequest(userId, requestData, this.userRepostory, next);
    }
    // upload cover image
    async uploadCoverImage(userId, file, next) {
        const result = await coverImageUpload(userId, file, this.s3, this.userRepostory, next);
        if (!result) {
            return next(new ErrorHandler(400, "User is founded"));
        }
        if (result) {
            console.log(" userCase ===>", result);
            return result;
        }
    }
    // ===================================================================>
    async getProfileImage(userId, next) {
        const result = await getProfileImage(userId, this.userRepostory, this.s3, next);
        if (!result) {
            return next(new ErrorHandler(400, "User is founded"));
        }
        return result;
    }
    // ===================================================================>
    //change password
    async changePrivacy(userId, isPrivacy, next) {
        const result = await changePrivacy(userId, isPrivacy, this.userRepostory, next);
        if (!result) {
            return next(new ErrorHandler(400, "Change privacy failed"));
        }
        return result;
    }
    // ===================================================================>
    //change password
    async showNotification(userId, isShowNotification, next) {
        const result = await changeShowNotification(userId, isShowNotification, this.userRepostory, next);
        console.log("resss=>", result);
        return result;
    }
    // ===================================================================>
    async getSkillRelatedUsers(userId, skill, next) {
        return await getSkillRelatedUsers(userId, skill, this.userRepostory, this.s3, next);
    }
    // ===================================================================>
    async getUserDetails(userId, next) {
        const result = await getUserDetails(userId, this.s3, this.userRepostory, next);
        if (!result) {
            return next(new ErrorHandler(400, "fetch user failed"));
        }
        return {
            success: true,
            user: result,
        };
    }
    // ===================================================================>
    async userFollowUp(toFollowingId, fromFollowerId, next) {
        await followUp(toFollowingId, fromFollowerId, this.userRepostory, next);
    }
    // ===================================================================>
    async getMyFollowings(userId, next) {
        return await getMyFollowings(userId, this.userRepostory, this.s3, next);
    }
    // ===================================================================>
    async myFollowers(userId, next) {
        return await myFollowers(userId, this.s3, this.userRepostory, next);
    }
    // ===================================================================>
    async unFollow(toUnfollowId, fromFollowerId, next) {
        return await unFollow(toUnfollowId, fromFollowerId, this.userRepostory, this.notification, next);
    }
    // ===================================================================>
    async removeFollower(fromRemoverId, toRemoveId, next) {
        return await removeFollower(fromRemoverId, toRemoveId, this.userRepostory, next);
    }
    async followBack(toFollowId, fromFollowingId, next) {
        return await followBack(toFollowId, fromFollowingId, this.userRepostory, next);
    }
    async othersFollowers(userId, currentUserId, next) {
        return await othersFollowers(userId, currentUserId, this.userRepostory, this.s3, next);
    }
    async othersFollowings(userId, currentUserId, next) {
        return await othersFollowings(userId, currentUserId, this.userRepostory, this.s3, next);
    }
    async uploadPost(userId, imageUrl, caption, type) {
        return await uploadPostandRetriveUrl(userId, imageUrl, caption, type, this.s3, this.userRepostory);
    }
    async uploadThoughts(userId, thoughts, next) {
        return await uploadThoughts(userId, thoughts, this.userRepostory, next);
    }
    async fetchPosts(userSkill, pageParam, next) {
        return await getPosts(userSkill, pageParam, this.s3, this.userRepostory, next);
    }
    async fetchMyPosts(userId, next) {
        return await fetchMyPosts(userId, this.userRepostory, this.s3, next);
    }
    async postView(postId, next) {
        return await postView(postId, this.userRepostory, this.s3, next);
    }
    async fetchOthersPosts(userId, next) {
        return await fetchOthersPosts(userId, this.userRepostory, this.s3, next);
    }
    async deletePost(postId, next) {
        return await deletePost(postId, this.userRepostory, next);
    }
    async editPost(editedCaption, postId, next) {
        return await editPost(editedCaption, postId, this.userRepostory, next);
    }
    async postLike(userId, postId, next) {
        return await postLike(userId, postId, this.userRepostory, this.notification, next);
    }
    async addComment(postId, userId, comment, next) {
        return await addComment(postId, userId, comment, this.userRepostory, this.s3, this.io, next);
    }
    async delteComment(postId, commentId, next) {
        return await deleteComment(postId, commentId, this.userRepostory, next);
    }
    async editingComment(postId, commentId, userId, updateComment, next) {
        return await editingComment(postId, commentId, userId, updateComment, this.userRepostory, next);
    }
    async searchUsers(query, next) {
        return await searchUsers(query, this.elasticSearchService, this.s3, next);
    }
    async reportPost(postId, reason, userId, next) {
        return await reportPost(postId, reason, userId, this.userRepostory, next);
    }
}
