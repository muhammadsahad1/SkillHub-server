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
exports.unFollow = void 0;
const unFollow = (toUnFollowId, fromFollowerId, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // remove the userId from following list to toUnFollowUser
        if (toUnFollowId && fromFollowerId) {
            // remove the userId from following of following user
            yield userModels.findByIdAndUpdate(fromFollowerId, {
                $pull: { following: toUnFollowId },
            });
            // removing the userId from followers of followed user
            yield userModels.findByIdAndUpdate(toUnFollowId, {
                $pull: { followers: fromFollowerId },
            });
        }
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
});
exports.unFollow = unFollow;
