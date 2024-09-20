import { IGroup } from "../../../../../commonEntities/entities/group.js";
import { IS3Operations } from "../../../../service/s3Bucket.js";
import { GroupModel } from "../../model/groupModel.js";

export const getGroups = async (
  groupModel: typeof GroupModel,
  s3Operations: IS3Operations
): Promise<IGroup[] | void> => {
  try {
    const groups = await groupModel.find({}).sort({ createdAt: -1 });

    const groupsWithImageUrl = await Promise.all(
      groups.map(async (grp) => {
        const groupImageName = grp?.groupImage;
        let groupImageUrl = "";

        if (groupImageName) {
          groupImageUrl = await s3Operations.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: groupImageName,
          });
        }

        return {
          ...grp.toObject(),
          groupImageUrl,
        };
      })
    );

    console.log("groups =>", groupsWithImageUrl);
    return groupsWithImageUrl as IGroup[];
  } catch (error) {
    console.error("Error fetching groups:", error);
    return undefined;
  }
};
