import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const changeShowNotification = async (
  userId: string,
  isShowNotification: boolean,
  userRepository: IuserRepository,
  next: Next
): Promise<{ success: boolean; status: boolean } | any> => {
  try {
    const result = await userRepository.changeShowNotification(
      userId,
      isShowNotification
    );
    console.log("result IN DB", result)
    // if (!result) {
    //   return next(
    //     new ErrorHandler(400, "failed to change notification settings")
    //   );
    
    return {
      success: true,
      status: result,
    };
  } catch (error: any) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
