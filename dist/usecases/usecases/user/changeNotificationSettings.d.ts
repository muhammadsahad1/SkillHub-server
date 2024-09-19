import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const changeShowNotification: (userId: string, isShowNotification: boolean, userRepository: IuserRepository, next: Next) => Promise<{
    success: boolean;
    status: boolean;
} | any>;
