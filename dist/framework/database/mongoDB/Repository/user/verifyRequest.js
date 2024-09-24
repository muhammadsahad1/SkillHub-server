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
exports.verifyRequest = void 0;
const verifyRequest = (userId, requestData, verificationRequestModal, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModels.findById(userId);
        const email = user === null || user === void 0 ? void 0 : user.email;
        if (user === null || user === void 0 ? void 0 : user.isRequested) {
            return {
                success: false,
                message: "You already requested"
            };
        }
        const { fullName, profession, company, website, proofLink } = requestData === null || requestData === void 0 ? void 0 : requestData.formData;
        // creating the newObject for newRequest
        const newRequest = {
            userId,
            email,
            fullName,
            profession,
            company,
            website,
            proofLink,
        };
        const verificationRequest = yield verificationRequestModal.create(newRequest);
        yield userModels.findByIdAndUpdate(userId, {
            isRequested: true,
        });
        return {
            success: true,
        };
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
});
exports.verifyRequest = verifyRequest;
