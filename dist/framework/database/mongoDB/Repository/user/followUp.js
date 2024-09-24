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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const followUp = (toFollowingId, fromFollowerId, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (toFollowingId && fromFollowerId) {
            const toFollowingObjectId = new mongoose_1.default.Types.ObjectId(toFollowingId);
            const fromFollowerObjectId = new mongoose_1.default.Types.ObjectId(fromFollowerId);
            yield userModels.findByIdAndUpdate({ _id: toFollowingObjectId }, {
                $addToSet: { followers: fromFollowerId },
            });
            yield userModels.findOneAndUpdate({ _id: fromFollowerObjectId }, {
                $addToSet: { following: toFollowingId },
            });
        }
        else {
            console.log("one of the id is not valid");
        }
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
});
exports.followUp = followUp;
