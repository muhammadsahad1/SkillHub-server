import { createGroup, getGroup, getGroups, joinGroup, leaveGroup, messages, sendMessage, updateOnlineStatus, } from "./group/index";
export class GroupRepository {
    groupModel;
    s3Operations;
    userModels;
    groupMessageModel;
    constructor(groupModel, s3Operations, userModels, groupMessageModel) {
        this.groupModel = groupModel;
        this.s3Operations = s3Operations;
        this.userModels = userModels;
        this.groupMessageModel = groupMessageModel;
    }
    async createGroup(groupData, creatorId, groupImageFile) {
        return await createGroup(groupData, creatorId, groupImageFile, this.s3Operations, this.groupModel);
    }
    async getGroups() {
        return await getGroups(this.groupModel, this.s3Operations);
    }
    async joinGroup(groupId, joinUserId) {
        return await joinGroup(groupId, joinUserId, this.groupModel);
    }
    async getGroup(groupId) {
        return await getGroup(groupId, this.s3Operations, this.groupModel, this.userModels);
    }
    async sendMessage(senderId, groupId, message) {
        return await sendMessage(senderId, groupId, message, this.groupMessageModel);
    }
    async messages(groupId) {
        return await messages(groupId, this.groupMessageModel, this.groupModel, this.userModels, this.s3Operations);
    }
    async updateOnlineStatus(groupId, userId, status) {
        return await updateOnlineStatus(groupId, userId, status, this.groupModel);
    }
    async leaveGroup(groupId, userId) {
        return await leaveGroup(groupId, userId, this.groupModel);
    }
}
