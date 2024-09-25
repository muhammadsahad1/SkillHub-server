import { IEvent } from "../../../../../commonEntities/entities/event.js";
import { IS3Operations } from "../../../../service/s3Bucket.js";
import { GroupModel } from "../../model/groupModel.js";
import { IGroupCreationData } from "../../../../../commonEntities/entities/createGroup.js";

export const createGroup = async (
  groupData: IGroupCreationData,
  creatorId: string,
  groupImageFile: Express.Multer.File | undefined,
  s3Operations: IS3Operations,
  groupModel: typeof GroupModel
) => {
  try {
    const { groupName, description, selectedSkills }: IGroupCreationData =
      groupData;
    let groupImage = "";

    //parsing the skill json object to array
    let skills: string[] = [];
    try {
      skills = JSON.parse(selectedSkills);
    } catch (error: any) {
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
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};
