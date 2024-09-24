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
exports.showNotification = void 0;
const showNotification = (userId, isShowNotification, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("status ==>", isShowNotification);
        const updatedUser = yield userModels.findByIdAndUpdate(userId, { $set: { showNotification: isShowNotification } }, { new: true } // Ensure the new option is set to true
        );
        console.log("updatedUser ===>", updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.showNotification);
        return updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.showNotification;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
});
exports.showNotification = showNotification;
