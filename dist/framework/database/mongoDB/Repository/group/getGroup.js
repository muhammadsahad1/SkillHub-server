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
exports.getGroup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const getGroup = (groupId, s3Operations, groupModel, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch group information from the database
        const group = yield groupModel.findById(groupId);
        if (!group) {
            throw new Error("Group not found");
        }
        // Fetch members' information
        const membersWithUserInfo = yield Promise.all(group.members.map((memberId) => __awaiter(void 0, void 0, void 0, function* () {
            // Ensure memberId is a valid ObjectId
            const memberObjectId = new mongoose_1.default.Types.ObjectId(memberId.userId);
            const user = yield userModels.findById(memberObjectId);
            if (!user) {
                // Handle the case where a user is not found
                return {
                    userId: memberObjectId.toString(),
                    userName: "Unknown",
                    profileImageUrl: "default-profile-image-url", // Provide a default or placeholder image
                };
            }
            // Get the profile image URL
            const profileImageName = user.profileImage || "unknown";
            const profileImageUrl = yield s3Operations.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: profileImageName,
            });
            return {
                userId: user.id,
                userName: user.name,
                profileImageUrl,
            };
        })));
        // Get the group's image URL
        const groupImageName = group.groupImage || "unknown";
        const groupImageUrl = yield s3Operations.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: groupImageName,
        });
        // Return the group data with additional information
        const groupData = group.toObject();
        groupData.groupImageUrl = groupImageUrl;
        return Object.assign(Object.assign({}, groupData), { members: membersWithUserInfo });
    }
    catch (error) {
        // Log the error or handle it according to your application's requirements
        console.error("Error fetching group:", error.message);
        return undefined;
    }
});
exports.getGroup = getGroup;
