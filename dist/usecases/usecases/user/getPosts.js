import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getPosts = async (userSKill, pageParam, s3, userRepository, next) => {
    try {
        const result = await userRepository.fetchPosts(userSKill, pageParam, s3);
        if (!result) {
            return next(new ErrorHandler(400, "Feed users post failed"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(400, "User is founded"));
    }
};
