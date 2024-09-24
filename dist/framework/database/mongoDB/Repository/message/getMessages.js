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
exports.getChat = void 0;
const getChat = (userToChatId, senderId, userModels, s3, conversationModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("userTOchjat ==>", userToChatId);
        const conversation = yield conversationModel
            .findOne({
            participants: { $all: [senderId, userToChatId] },
        })
            .populate("messages");
        if (!conversation || !conversation.messages) {
            const user = yield userModels
                .findById(userToChatId)
                .select("_id name email profileImage");
            let profileImageUrl = "";
            if (user === null || user === void 0 ? void 0 : user.profileImage) {
                profileImageUrl = yield s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: user === null || user === void 0 ? void 0 : user.profileImage,
                });
            }
            const userWithProfileImage = Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user.toObject()), { profileImageUrl: profileImageUrl });
            const result = {
                messages: [],
                userWithProfileImage,
            };
            return result;
        }
        const messageWithAllData = yield Promise.all(conversation === null || conversation === void 0 ? void 0 : conversation.messages.map((msg) => __awaiter(void 0, void 0, void 0, function* () {
            const media = msg === null || msg === void 0 ? void 0 : msg.media;
            if (media) {
                const mediaImgUrl = yield s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: media
                });
                return Object.assign(Object.assign({}, msg.toObject()), { mediaUrl: mediaImgUrl });
            }
            return msg.toObject();
        })));
        const user = yield userModels
            .findById(userToChatId)
            .select("_id name email profileImage");
        let profileImageUrl = "";
        if (user === null || user === void 0 ? void 0 : user.profileImage) {
            profileImageUrl = yield s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: user === null || user === void 0 ? void 0 : user.profileImage,
            });
        }
        const userWithProfileImage = Object.assign(Object.assign({}, user === null || user === void 0 ? void 0 : user.toObject()), { profileImageUrl: profileImageUrl });
        const result = {
            messages: messageWithAllData,
            userWithProfileImage,
        };
        console.log("result ==>", result);
        return result;
    }
    catch (error) {
        console.error("Error in create conversation:", error);
        return undefined;
    }
});
exports.getChat = getChat;
