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
exports.sendImage = void 0;
const sendImage = (senderId, receiverId, file, messageRepository, s3Operations, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("useCasilKeti");
        const result = yield messageRepository.sendImage(senderId, receiverId, file, s3Operations);
        return result;
    }
    catch (error) {
    }
});
exports.sendImage = sendImage;
