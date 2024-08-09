import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const changeShowNotification = async (userId, isShowNotification, userRepository, next) => {
    try {
        const result = await userRepository.changeShowNotification(userId, isShowNotification);
        console.log("result IN DB", result);
        // if (!result) {
        //   return next(
        //     new ErrorHandler(400, "failed to change notification settings")
        //   );
        return {
            success: true,
            status: result,
        };
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
