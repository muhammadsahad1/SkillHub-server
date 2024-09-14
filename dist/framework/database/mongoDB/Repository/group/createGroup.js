export const createGroup = async (groupData, creatorId, groupImageFile, s3Operations, groupModel) => {
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
            groupImage = await s3Operations.putObjectUrl(putObjectUrl);
        }
        const newGroup = {
            groupName,
            description,
            creatorId,
            skills,
            members: [{ userId: creatorId }],
            groupImage,
        };
        await groupModel.create(newGroup);
        return {
            success: true,
            message: "Group created successful",
        };
    }
    catch (error) {
        console.error("Error creating group:", error);
        throw error;
    }
};
