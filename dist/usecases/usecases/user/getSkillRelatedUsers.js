import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getSkillRelatedUsers = async (userId, skill, userRepository, s3, next) => {
    console.log("casil ketiiiiiiii");
    const result = await userRepository.getSkillRelatedUsers(userId, skill, s3);
    console.log("result after repo ==>", result);
    if (!result) {
        return next(new ErrorHandler(401, "fetching skill related users failed"));
    }
    return {
        success: true,
        userDetails: result,
    };
};
