import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const changeShowNotification = async (userId, isShowNotification, userRepository, next) => {
    try {
        const result = await userRepository.changeShowNotification(userId, isShowNotification);
        console.log("result IN DB", result);
        return {
            success: true,
            status: result,
        };
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
