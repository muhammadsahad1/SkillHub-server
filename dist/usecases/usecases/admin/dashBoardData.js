import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const dashBoardData = async (adminRepository, next) => {
    try {
        const result = await adminRepository.dashBoardData();
        console.log("res ==>", result);
        if (!result) {
            return next(new ErrorHandler(401, "data not fount"));
        }
        return result;
    }
    catch (error) {
        throw new Error("error in dashboardata");
    }
};
