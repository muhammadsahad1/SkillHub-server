import { createUser, findByEmail, createProfile, findByEmailUpdatePicture, resetPasswordVerify, getUser, changePassword, findUpdateResetToken, fetchProfileImage, uploadCoverImage, showNotification, getSkillRelatedUsers, getUsersImageUrls, getUserDetails, followUp, getMyFollowing, unFollow, myFollowers, removeFollower, followBack, postLike, getOthersFollowers, getOthersFollowersImageUrls, getOthersFollowings, getOthersFollowingsImageUrl, changePrivacy, verifyRequest, } from "./user/index";
import { uploadPost, fetchPosts, deletePost, editPost, fetchMyPosts, addComment, getCommentedUserImage, deleteComment, editComment, fetchOthersPosts, postView, uploadThoughts, reportPost, } from "./post/index";
//Passing the user properties to DB intraction function with userModel/schema
export class UserRepository {
    userModels;
    postModels;
    verificationRequestModal;
    requestModel;
    constructor(userModels, postModels, verificationRequestModal, requestModel) {
        this.userModels = userModels;
        this.postModels = postModels;
        this.verificationRequestModal = verificationRequestModal;
        this.requestModel = requestModel;
    }
    // ===================================================================>
    async createProfile(userProfile, file, S3Operations) {
        return await createProfile(userProfile, file, S3Operations, this.userModels);
    }
    // ===================================================================>
    async verifyRequest(userId, requestData) {
        return await verifyRequest(userId, requestData, this.verificationRequestModal, this.userModels);
    }
    // ===================================================================>
    async createUser(newUser) {
        return await createUser(newUser, this.userModels);
    }
    // ===================================================================>
    async findByEmail(email) {
        return await findByEmail(this.userModels, email);
    }
    // ===================================================================>
    async findByEmailUpdateOne(email, picture) {
        return await findByEmailUpdatePicture(this.userModels, email, picture);
    }
    // ===================================================================>
    async findOneUpdateResetToken(email, resetToken) {
        const resInfisrt = await findUpdateResetToken(this.userModels, email, resetToken);
        return resInfisrt;
    }
    // ===================================================================>
    async getSkillRelatedUsers(userId, skill, s3Bucket) {
        const users = await getSkillRelatedUsers(userId, skill, this.userModels);
        if (!users || users.length === 0) {
            return [];
        }
        const res = await getUsersImageUrls(users, [], s3Bucket);
        return res;
    }
    // ===================================================================>
    async getUserDetails(userId) {
        return await getUserDetails(userId, this.userModels);
    }
    // ===================================================================>
    async resetPasswordVerify(password, token) {
        return await resetPasswordVerify(this.userModels, password, token);
    }
    // ===================================================================>
    async fetchProfileImage(S3Operations, userId) {
        return await fetchProfileImage(this.userModels, S3Operations, userId);
    }
    // cover image upload
    async uploadeCoverImage(userId, file, S3Operations) {
        return await uploadCoverImage(this.userModels, userId, file, S3Operations);
    }
    // ===================================================================>
    async findByIdUpdateUpdateOne(userId, password) {
        return await changePassword(this.userModels, userId, password);
    }
    // ===================================================================>
    async changeShowNotification(userId, isShowNotification) {
        return await showNotification(userId, isShowNotification, this.userModels);
    }
    // ===================================================================>
    async followUp(toFollowingId, fromFollowerId) {
        await followUp(toFollowingId, fromFollowerId, this.userModels);
    }
    // ===================================================================>
    async getUser(userId) {
        return await getUser(this.userModels, userId);
    }
    async getMyFollowing(userId, S3Operations) {
        const followingUsers = await getMyFollowing(userId, this.userModels, S3Operations);
        if (!followingUsers || followingUsers.length === 0) {
            return [];
        }
        const followingUsersWithImage = await getUsersImageUrls(followingUsers, [], S3Operations);
        return followingUsersWithImage;
    }
    // ===================================================================>
    async unFollow(toUnFollowId, fromFollowerId) {
        return await unFollow(toUnFollowId, fromFollowerId, this.userModels);
    }
    async myFollowers(userId, S3Operations) {
        const result = await myFollowers(userId, this.userModels);
        if (!result) {
            return [];
        }
        const { followersUsers, following } = result;
        if (!followersUsers || followersUsers?.length === 0) {
            return [];
        }
        const followersUsersWithImage = await getUsersImageUrls(followersUsers, following, S3Operations);
        return followersUsersWithImage;
    }
    // ===================================================================>
    async removeFollower(fromRemoverId, toRemoveId) {
        return await removeFollower(fromRemoverId, toRemoveId, this.userModels);
    }
    // ===================================================================>
    async followBack(fromFollowingId, toFollowId) {
        return await followBack(fromFollowingId, toFollowId, this.userModels);
    }
    // ===================================================================>
    async othersFollowers(userId, currentUserId, S3Operations) {
        const followers = await getOthersFollowers(userId, this.userModels);
        if (!followers || followers?.length === 0) {
            return [];
        }
        return await getOthersFollowersImageUrls(followers, currentUserId, this.userModels, S3Operations);
    }
    async othersFollowings(userId, currentUserId, s3) {
        const followings = await getOthersFollowings(userId, this.userModels);
        if (!followings || followings?.length === 0) {
            return [];
        }
        return await getOthersFollowingsImageUrl(followings, currentUserId, this.userModels, s3);
    }
    async uploadPostRetriveImageUrl(userId, file, caption, type, s3) {
        return await uploadPost(userId, file, caption, type, s3, this.userModels, this.postModels);
    }
    // ===================================================================>
    async uploadThoughts(userId, thoughts) {
        return await uploadThoughts(userId, thoughts, this.postModels);
    }
    // ===================================================================>
    async fetchPosts(userSkill, pageParam, s3) {
        return await fetchPosts(userSkill, pageParam, s3, this.userModels, this.postModels);
    }
    // ===================================================================>
    async deletePost(postId) {
        return await deletePost(postId, this.postModels);
    }
    async editPost(caption, postId) {
        return await editPost(caption, postId, this.postModels);
    }
    async postLike(userId, postId) {
        return await postLike(userId, postId, this.postModels);
    }
    async addComment(postId, userId, comment, s3, next) {
        const newComment = await addComment(postId, userId, comment, this.postModels, this.userModels);
        if (!newComment) {
            return [];
        }
        const newFirstComment = newComment?.comments[0];
        const userIdToFetch = newFirstComment.userId.toString();
        const postOwnerId = newComment?.postOwnerId;
        return await getCommentedUserImage(postOwnerId, userIdToFetch, s3, this.userModels, next);
    }
    async fetchMyPosts(userId, s3) {
        return await fetchMyPosts(userId, s3, this.postModels);
    }
    async fetchOthersPosts(userId, s3) {
        return await fetchOthersPosts(userId, s3, this.postModels, this.userModels);
    }
    async postView(postId) {
        return await postView(postId, this.postModels);
    }
    async editComment(postId, commentId, userId, updatedComment) {
        return await editComment(postId, commentId, userId, updatedComment, this.postModels);
    }
    async deleteComment(postId, commentId) {
        return await deleteComment(postId, commentId, this.postModels);
    }
    async changePrivacy(userId, isPrivacy) {
        return await changePrivacy(userId, isPrivacy, this.userModels);
    }
    async reportPost(postId, reason, userId) {
        return await reportPost(postId, reason, userId, this.postModels, this.requestModel);
    }
    getAllUsers() {
        throw new Error("Method not implemented.");
    }
    // ===================================================================>
    blockUser(id) {
        throw new Error("Method not implemented.");
    }
}
