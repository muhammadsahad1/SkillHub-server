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
exports.myFollowers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const myFollowers = (userId, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModels.findById(userId).lean();
        const followersArray = user === null || user === void 0 ? void 0 : user.followers;
        const followers = followersArray.filter((id) => mongoose_1.default.Types.ObjectId.isValid(id));
        const followersUsers = yield userModels.find({ _id: { $in: followers } });
        // returning followerUsers and followingback userId
        return {
            followersUsers,
            following: user === null || user === void 0 ? void 0 : user.following,
        };
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
});
exports.myFollowers = myFollowers;
