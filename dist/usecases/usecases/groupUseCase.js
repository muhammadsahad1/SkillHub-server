import { createGroup, getGroup, getGroups, joinGroup, leaveGroup, messages, sendMessage, updateOnlineStatus, } from "./group/index";
// ================================ GroupUseCase =========================== \\
export class GroupUseCase {
    groupRepository;
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    async createGroup(groupData, creatorId, groupImageFile, next) {
        return await createGroup(groupData, creatorId, groupImageFile, this.groupRepository, next);
    }
    async getGroups(next) {
        return await getGroups(next, this.groupRepository);
    }
    async joinGroup(groupId, joinUserId, next) {
        return await joinGroup(groupId, joinUserId, this.groupRepository, next);
    }
    async getGroup(groupId, next) {
        return await getGroup(groupId, this.groupRepository, next);
    }
    async sendMessage(senderId, groupId, message, next) {
        return await sendMessage(senderId, groupId, message, this.groupRepository, next);
    }
    async messages(groupId, next) {
        return await messages(groupId, this.groupRepository, next);
    }
    async updateOnlineStatus(groupId, userId, status, next) {
        console.log("usecaseil");
        return await updateOnlineStatus(groupId, userId, status, this.groupRepository, next);
    }
    async leaveGroup(groupId, userId, next) {
        return await leaveGroup(groupId, userId, this.groupRepository, next);
    }
}
