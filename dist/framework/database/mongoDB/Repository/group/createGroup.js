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
exports.createGroup = void 0;
const createGroup = (groupData, creatorId, groupImageFile, s3Operations, groupModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupName, description, selectedSkills } = groupData;
        let groupImage = "";
        //parsing the skill json object to array
        let skills = [];
        try {
            skills = JSON.parse(selectedSkills);
        }
        catch (error) {
            console.error("Error parsing selectedSkills:", error.message);
            throw new Error("Invalid skills format");
        }
        if (groupImageFile) {
            const { buffer, mimetype, originalname } = groupImageFile;
            const putObjectUrl = { originalname, buffer, mimetype };
            groupImage = yield s3Operations.putObjectUrl(putObjectUrl);
        }
        const newGroup = {
            groupName,
            description,
            creatorId,
            skills,
            members: [{ userId: creatorId }],
            groupImage,
        };
        yield groupModel.create(newGroup);
        return {
            success: true,
            message: "Group created successful",
        };
    }
    catch (error) {
        console.error("Error creating group:", error);
        throw error;
    }
});
exports.createGroup = createGroup;
