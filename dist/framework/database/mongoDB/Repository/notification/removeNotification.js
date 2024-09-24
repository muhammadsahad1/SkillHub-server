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
exports.removeNotification = void 0;
const removeNotification = (receiverId, type, notificationModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield notificationModel.deleteMany({ receiverId, type });
        console.log("resssss =>", result);
        if (result.deletedCount === 0) {
            console.log("No matching notification found.");
        }
        else {
            console.log(`Notification of type ${type} for receiver ${receiverId} has been deleted.`);
        }
    }
    catch (error) {
        console.error("fetch notifications failed:", error);
        return undefined;
    }
});
exports.removeNotification = removeNotification;
