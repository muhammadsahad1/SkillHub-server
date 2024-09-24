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
exports.getVerificationRequests = void 0;
const getVerificationRequests = (verificationRequestsModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield verificationRequestsModel
            .find({})
            .sort({ createdAt: -1 });
        return result;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined; // Handle error as needed
    }
});
exports.getVerificationRequests = getVerificationRequests;
