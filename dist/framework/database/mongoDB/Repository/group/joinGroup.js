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
exports.joinGroup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joinGroup = (groupId, joinUserId, groupModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield groupModel.findById(groupId);
        const userId = new mongoose_1.default.Types.ObjectId(joinUserId);
        if (group) {
            const isMember = group.members.some((member) => member.userId.equals(userId));
            if (!isMember) {
                yield group.updateOne({ $push: { members: { userId: userId } } });
                return {
                    success: true,
                    message: "Joined group successfully",
                };
            }
            else {
                return {
                    success: false,
                    message: "User is already a member of the group",
                };
            }
        }
        else {
            return {
                success: false,
                message: "Group not found",
            };
        }
    }
    catch (error) {
        console.error("Error joining group:", error);
        return {
            success: false,
            message: "Failed to join group",
        };
    }
});
exports.joinGroup = joinGroup;
