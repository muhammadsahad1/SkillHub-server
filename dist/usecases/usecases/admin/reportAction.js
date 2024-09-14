import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const reportAction = async (reportId, status, adminRepository, next) => {
    try {
        const result = await adminRepository.reportAction(reportId, status);
        if (!result) {
            return next(new ErrorHandler(401, "report action failed"));
        }
        return result;
    }
    catch (error) {
        console.log("error =>", error);
    }
};
