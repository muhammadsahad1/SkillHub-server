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
exports.markAsRead = void 0;
const markAsRead = (notificationId, notificationModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notify = yield notificationModel.findByIdAndUpdate(notificationId, {
            read: true,
        }, { new: true });
        yield notificationModel.findByIdAndDelete(notify === null || notify === void 0 ? void 0 : notify._id);
        console.log("notiyyyy ====>", notify);
    }
    catch (error) {
        console.error("Error in create conversation:", error);
    }
});
exports.markAsRead = markAsRead;
