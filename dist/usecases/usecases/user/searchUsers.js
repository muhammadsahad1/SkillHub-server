import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const searchUsers = async (query, elasticsearch, s3, next) => {
    try {
        const result = await elasticsearch.searchUsers(query, s3);
        if (!result || result.length === 0) {
            return next(new ErrorHandler(401, "data not found"));
        }
        return {
            success: true,
            result: result,
        };
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
