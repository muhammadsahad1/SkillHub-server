import { getChat, sendMessage, getConversationsUsers, markAsRead, sendImage } from './message/index.js';
export class MessageUseCase {
    messageRepository;
    s3;
    constructor(messageRepository, s3) {
        this.messageRepository = messageRepository;
        this.s3 = s3;
    }
    async sendMessage(senderId, receiverId, message, next) {
        return await sendMessage(senderId, receiverId, message, this.messageRepository, next);
    }
    async getChat(userToChatId, senderId, next) {
        return await getChat(userToChatId, senderId, this.s3, this.messageRepository, next);
    }
    async getConversationsUsers(userId, next) {
        return await getConversationsUsers(userId, this.messageRepository, this.s3, next);
    }
    async markAsRead(conversationId, userId, next) {
        await markAsRead(conversationId, userId, this.messageRepository, next);
    }
    async sendImage(senderId, receiverId, file, next) {
        return await sendImage(senderId, receiverId, file, this.messageRepository, this.s3, next);
    }
}
