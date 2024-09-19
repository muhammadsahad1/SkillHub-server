import { getChat, getConversationsUsers, markMessagesAsRead, sendMessage, sendImage } from './message/index.js';
export class MessageRepository {
    conversationModal;
    messageModal;
    userModels;
    constructor(conversationModal, messageModal, userModels) {
        this.conversationModal = conversationModal;
        this.messageModal = messageModal;
        this.userModels = userModels;
    }
    async sendMessage(senderId, receiverId, message) {
        return await sendMessage(senderId, receiverId, message, this.messageModal, this.conversationModal);
    }
    async getChat(userToChatId, senderId, s3) {
        return await getChat(userToChatId, senderId, this.userModels, s3, this.conversationModal);
    }
    async getConversationsUsers(userId, s3) {
        return await getConversationsUsers(userId, s3, this.messageModal, this.conversationModal);
    }
    async markAsRead(conversationId, userId) {
        return await markMessagesAsRead(conversationId, userId, this.messageModal, this.conversationModal);
    }
    async sendImage(senderId, receiverId, file, s3Operations) {
        return await sendImage(senderId, receiverId, file, s3Operations, this.messageModal, this.conversationModal);
    }
}
