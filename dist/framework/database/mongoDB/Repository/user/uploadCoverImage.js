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
exports.uploadCoverImage = void 0;
const uploadCoverImage = (userModels, userId, file, S3Operations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buffer = file.buffer;
        const mimetype = file.mimetype;
        const originalname = file.originalname;
        const PutObjectParams = {
            originalname,
            buffer,
            mimetype,
        };
        const imageName = yield S3Operations.putObjectUrl(PutObjectParams);
        const updatedUser = yield userModels.findOneAndUpdate({ _id: userId }, { $set: { coverImage: imageName, coverImageKey: file.originalname } }, { new: true });
        return updatedUser;
    }
    catch (error) {
        console.error("Error updating : cover image", error);
        return undefined; // Handle error as needed
    }
});
exports.uploadCoverImage = uploadCoverImage;
