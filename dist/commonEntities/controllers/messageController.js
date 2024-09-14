export class MessageController {
    messageUseCase;
    constructor(messageUseCase) {
        this.messageUseCase = messageUseCase;
    }
    async sendMessage(req, res, next) {
        const { receiverId, messages } = req.body;
        const senderId = req.user?.id;
        const result = await this.messageUseCase.sendMessage(senderId, receiverId, messages, next);
        res.status(201).json(result);
    }
    async getChat(req, res, next) {
        const { senderId, userToChatId } = req.query;
        const result = await this.messageUseCase.getChat(userToChatId, senderId, next);
        res.status(200).json(result);
    }
    async chatUsers(req, res, next) {
        const userId = req.user?.id;
        const result = await this.messageUseCase.getConversationsUsers(userId, next);
        res.status(200).json(result);
    }
    async markAsRead(req, res, next) {
        const { conversationId } = req.body;
        const userId = req.user?.id;
        await this.messageUseCase.markAsRead(conversationId, userId, next);
    }
    async uploadImage(req, res, next) {
        const { senderId, receiverId } = req.body;
        const result = await this.messageUseCase.sendImage(senderId, receiverId, req.file, next);
        res.status(200).json(result);
        return result;
    }
}
