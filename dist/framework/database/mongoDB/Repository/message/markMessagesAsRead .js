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
exports.markMessagesAsRead = void 0;
const markMessagesAsRead = (conversationId, userId, messageModal, conversationModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("vannnn ===>", conversationId);
        // Find the conversation and populate messages
        const conversation = yield conversationModel
            .findById(conversationId)
            .populate("messages");
        if (!conversation) {
            return;
        }
        yield Promise.all(conversation === null || conversation === void 0 ? void 0 : conversation.messages.map((message) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("messagesss ====>", message);
            if (message && !message.readBy.includes(userId)) {
                message.readBy.push(userId);
                yield messageModal.updateOne({
                    _id: message._id,
                }, { $addToSet: { readBy: userId } });
            }
        })));
    }
    catch (error) {
        console.error("Error in markMessagesAsRead:", error);
    }
});
exports.markMessagesAsRead = markMessagesAsRead;
