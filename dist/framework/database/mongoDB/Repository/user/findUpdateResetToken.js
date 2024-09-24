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
exports.findUpdateResetToken = void 0;
// updating user for attaching resetToken
const findUpdateResetToken = (userModels, email, resetToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAttachResetLink = yield userModels.findOneAndUpdate({ email: email }, { $set: { resetPasswordToken: resetToken } }, { new: true });
        return userAttachResetLink;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
});
exports.findUpdateResetToken = findUpdateResetToken;
