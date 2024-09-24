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
exports.updateOnlineStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const updateOnlineStatus = (groupId, userId, status, groupModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("ethi DB", groupId, userId, status);
        const groupID = new mongoose_1.default.Types.ObjectId(groupId);
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        // Update the online status
        const updateGrp = yield groupModel.updateOne({
            _id: groupID,
            "members.userId": userID,
        }, { $set: { "members.$.isOnline": status } }, { new: true, projection: { members: 1 } });
        if (!updateGrp) {
            return {
                success: false,
                message: "Group not found",
            };
        }
        // Check if any document was matched and modified
        if (updateGrp.matchedCount === 0) {
            return {
                success: false,
                message: "Group not found or member not part of the group",
            };
        }
        if (updateGrp.modifiedCount === 0) {
            return {
                success: false,
                message: "Status was not changed",
            };
        }
        // Fetch the group with all members
        const groupWithMembers = yield groupModel
            .findById(groupID)
            .select("members");
        console.log("grpMember ==>", groupWithMembers);
        if (!groupWithMembers) {
            return {
                success: false,
                message: "Group or members not found",
            };
        }
        // Return the updated members array
        return {
            success: true,
            message: "Group online status changed",
            updatedMember: groupWithMembers.members,
        };
    }
    catch (error) {
        return {
            success: false,
            message: "Change online status failed",
        };
    }
});
exports.updateOnlineStatus = updateOnlineStatus;
