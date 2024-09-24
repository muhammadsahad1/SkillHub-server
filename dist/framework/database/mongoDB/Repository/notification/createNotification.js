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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const isValidObjectId = (id) => mongoose_1.default.Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);
const createNotification = (senderId, receiverId, message, type, link, notificationModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate ObjectId
        if (!isValidObjectId(senderId) || !isValidObjectId(receiverId)) {
            throw new Error('Invalid ObjectId format');
        }
        const senderObjId = new mongoose_1.default.Types.ObjectId(senderId);
        const receiverObjId = new mongoose_1.default.Types.ObjectId(receiverId);
        const newNotification = {
            senderId: senderObjId,
            receiverId: receiverObjId,
            message,
            type,
            link,
            read: false,
        };
        console.log("newNoti==>", newNotification);
        const notification = yield notificationModel.create(newNotification);
        const result = yield notification.save();
        return result;
    }
    catch (error) {
        console.error("Error in createNotification:", error);
        return undefined;
    }
});
exports.createNotification = createNotification;
