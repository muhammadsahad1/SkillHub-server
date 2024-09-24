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
exports.uploadPostandRetriveUrl = void 0;
const uploadPostandRetriveUrl = (userId, file, caption, type, S3Operations, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("vannoo ?sdfdsf");
        const result = yield userRepository.uploadPostRetriveImageUrl(userId, file, caption, type, S3Operations);
        console.log("result ====> useCasill =>", result);
        if (!result) {
            return {
                success: false,
                message: "Post upload failed",
                post: null
            };
        }
        return {
            success: true,
            message: "Post created successfully",
            post: result
        };
    }
    catch (error) {
        console.error("Error in uploadPostandRetriveUrl:", error);
        return {
            success: false,
            message: "Internal Server Error",
            post: null
        };
    }
});
exports.uploadPostandRetriveUrl = uploadPostandRetriveUrl;
