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
exports.changeVerifyStatus = void 0;
const changeVerifyStatus = (requestId, status, userModal, verifyRequstModal) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield verifyRequstModal.findById(requestId);
        if (!request) {
            throw new Error(`Verification request with ID ${requestId} not found`);
        }
        //  changing the status of request status
        request.status = status;
        yield request.save();
        const userId = request.userId;
        // updating the user modal for proffesional account
        const user = yield userModal.findByIdAndUpdate(userId).exec();
        if (!user) {
            throw new Error(`User with ID ${request.userId} not found`);
        }
        if (status === "Approved") {
            user.isProfessional = true;
            user.professionalBadge = true;
            user.verificationStatus = status;
            user.proofLink = request.proofLink;
        }
        else {
            user.verificationStatus = status;
        }
        // save the all update
        yield user.save();
        return {
            success: true
        };
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined; // Handle error as needed
    }
});
exports.changeVerifyStatus = changeVerifyStatus;
