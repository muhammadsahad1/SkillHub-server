import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const createGroup = async (groupData, creatorId, groupImageFile, groupRepository, next) => {
    try {
        const result = await groupRepository.createGroup(groupData, creatorId, groupImageFile);
        if (!result) {
            return next(new ErrorHandler(401, "Group creation falied"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(401, "Internal server error"));
    }
};
