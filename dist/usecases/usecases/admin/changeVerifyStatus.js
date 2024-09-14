import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const changeVerifyStatus = async (requestId, status, adminRepostory, io, next) => {
    try {
        const result = await adminRepostory.changeVerifyStatus(requestId, status);
        if (!result) {
            return next(new ErrorHandler(401, "updating the status failed"));
        }
        return result;
    }
    catch (error) {
        console.log("error =>", error);
    }
};
