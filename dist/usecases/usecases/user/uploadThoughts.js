import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const uploadThoughts = async (userId, thoughts, userRepository, next) => {
    try {
        console.log("userId =>", userId);
        const result = await userRepository.uploadThoughts(userId, thoughts);
        console.log("result==>", result);
        if (!result) {
            return next(new ErrorHandler(401, "Thoughts posting failed"));
        }
        console.log("result after upload the thoughts post ==>", result);
        return result;
    }
    catch (error) {
    }
};
