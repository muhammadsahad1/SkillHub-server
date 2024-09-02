import { IEvent } from "../../../../../commonEntities/entities/event";
import { IS3Operations } from "../../../../service/s3Bucket";
import { GroupModel } from "../../model/groupModel";
import { IGroupCreationData } from "../../../../../commonEntities/entities/createGroup";

export const createGroup = async (
  groupData: IGroupCreationData,
  creatorId: string,
  groupImageFile: Express.Multer.File | undefined,
  s3Operations: IS3Operations,
  groupModel: typeof GroupModel
) => {
  try {
    const { groupName, description, skills }: IGroupCreationData = groupData;
    let groupImage = "";

    if (groupImageFile) {
      const { buffer, mimetype, originalname } = groupImageFile;
      const putObjectUrl = { buffer, mimetype, originalname };
      groupImage = await s3Operations.putObjectUrl(putObjectUrl);
    }

    const newGroup = {
      groupName,
      description,
      skills,
      creatorId,
      groupImage,
    };

    const createdNewGroup = await groupModel.create(newGroup);
    console.log(createdNewGroup)
    return {
      success: true,
      message: "Group created successful",
    };
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};
