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
exports.changePrivacy = void 0;
const changePrivacy = (userId, isPrivacy, userModelS) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("status of privacy ==>", isPrivacy);
        const updatePrivacySettings = yield userModelS.findOneAndUpdate({ _id: userId }, { accountPrivacy: isPrivacy }, { new: true });
        console.log("updatedPrivacy", updatePrivacySettings);
        return updatePrivacySettings;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        throw new Error("Error updating profile"); // Throwing the error to handle it appropriately in the caller function
    }
});
exports.changePrivacy = changePrivacy;
