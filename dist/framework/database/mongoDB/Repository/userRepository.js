// Import functions
import { createUser, findByEmail, createProfile, findByEmailUpdatePicture, resetPasswordVerify, getUser, changePassword, findUpdateResetToken, fetchProfileImage, uploadCoverImage, showNotification, getSkillRelatedUsers, getUsersImageUrls, getUserDetails, followUp, getMyFollowing, unFollow, myFollowers, removeFollower, followBack, postLike, getOthersFollowers, getOthersFollowersImageUrls, getOthersFollowings, getOthersFollowingsImageUrl, } from "./user/index";
import { uploadPost, fetchPosts, deletePost, editPost, fetchMyPosts, addComment, getCommentedUserImage, } from "./post/index";
export class UserRepository {
    userModels;
    postModels;
    constructor(userModels, postModels) {
        this.userModels = userModels;
        this.postModels = postModels;
    }
    // findByIdUpdateUpdateOne(userId: string, password: string): Promise<Iuser | void> {
    //   throw new Error("Method not implemented.");
    // }
    // uploadeCoverImage(userId: string, file: Express.Multer.File, s3: any): Promise<Iuser | void> {
    //   throw new Error("Method not implemented.");
    // }
    // uploadPostRetriveImageUrl(userId: string, file: Express.Multer.File, caption: string, type: string, s3: IS3Operations): Promise<any> {
    //   throw new Error("Method not implemented.");
    // }
    // User Methods
    async createProfile(userProfile, file, S3Operations) {
        return await createProfile(userProfile, file, S3Operations, this.userModels);
    }
    async createUser(newUser) {
        return await createUser(newUser, this.userModels);
    }
    async findByEmail(email) {
        return await findByEmail(this.userModels, email);
    }
    async findByEmailUpdateOne(email, picture) {
        return await findByEmailUpdatePicture(this.userModels, email, picture);
    }
    async findOneUpdateResetToken(email, resetToken) {
        return await findUpdateResetToken(this.userModels, email, resetToken);
    }
    async getSkillRelatedUsers(userId, skill, s3Bucket) {
        const users = await getSkillRelatedUsers(userId, skill, this.userModels);
        if (!users || users.length === 0) {
            return [];
        }
        return await getUsersImageUrls(users, [], s3Bucket);
    }
    async getUserDetails(userId) {
        return await getUserDetails(userId, this.userModels);
    }
    async resetPasswordVerify(password, token) {
        return await resetPasswordVerify(this.userModels, password, token);
    }
    async fetchProfileImage(S3Operations, userId) {
        return await fetchProfileImage(this.userModels, S3Operations, userId);
    }
    async uploadCoverImage(userId, file, S3Operations) {
        return await uploadCoverImage(this.userModels, userId, file, S3Operations);
    }
    async changePassword(userId, password) {
        return await changePassword(this.userModels, userId, password);
    }
    async changeShowNotification(userId, isShowNotification) {
        return await showNotification(userId, isShowNotification, this.userModels);
    }
    async followUp(toFollowingId, fromFollowerId) {
        await followUp(toFollowingId, fromFollowerId, this.userModels);
    }
    async getUser(userId) {
        return await getUser(this.userModels, userId);
    }
    async getMyFollowing(userId, S3Operations) {
        const followingUsers = await getMyFollowing(userId, this.userModels, S3Operations);
        if (!followingUsers || followingUsers.length === 0) {
            return [];
        }
        return await getUsersImageUrls(followingUsers, [], S3Operations);
    }
    async unFollow(toUnFollowId, fromFollowerId) {
        return await unFollow(toUnFollowId, fromFollowerId, this.userModels);
    }
    async myFollowers(userId, S3Operations) {
        const { followersUsers, following } = await myFollowers(userId, this.userModels);
        if (!followersUsers || followersUsers.length === 0) {
            return [];
        }
        return await getUsersImageUrls(followersUsers, following, S3Operations);
    }
    async removeFollower(fromRemoverId, toRemoveId) {
        return await removeFollower(fromRemoverId, toRemoveId, this.userModels);
    }
    async followBack(fromFollowingId, toFollowId) {
        return await followBack(fromFollowingId, toFollowId, this.userModels);
    }
    async othersFollowers(userId, currentUserId, S3Operations) {
        const followers = await getOthersFollowers(userId, this.userModels);
        if (!followers || followers.length === 0) {
            return [];
        }
        return await getOthersFollowersImageUrls(followers, currentUserId, this.userModels, S3Operations);
    }
    async othersFollowings(userId, currentUserId, s3) {
        const followings = await getOthersFollowings(userId, this.userModels);
        if (!followings || followings.length === 0) {
            return [];
        }
        return await getOthersFollowingsImageUrl(followings, currentUserId, this.userModels, s3);
    }
    // Post Methods
    async uploadPostRetrieveImageUrl(userId, file, caption, type, s3) {
        return await uploadPost(userId, file, caption, type, s3, this.userModels, this.postModels);
    }
    async fetchPosts(userSkill, s3) {
        return await fetchPosts(userSkill, s3, this.userModels, this.postModels);
    }
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
        const newComments = await addComment(postId, userId, comment, this.postModels);
        if (!newComments || newComments.length === 0) {
            return [];
        }
        const newFirstComment = newComments[0];
        const userIdToFetch = newFirstComment.userId.toString();
        const result = await getCommentedUserImage(userIdToFetch, s3, this.userModels, next);
        const comments = {
            ...newComments,
            userName: result?.userName,
            usersImage: result?.userWithImage,
        };
        console.log("return object ====>", comments);
        return {
            comments,
        };
    }
    async fetchMyPosts(userId, s3) {
        return await fetchMyPosts(userId, s3, this.postModels);
    }
    getAllUsers() {
        throw new Error("Method not implemented.");
    }
    blockUser(id) {
        throw new Error("Method not implemented.");
    }
}
