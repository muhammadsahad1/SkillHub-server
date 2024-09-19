import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const removeFollower: (fromRemoverId: string, toRemoveId: string, userRepository: IuserRepository, next: Next) => Promise<{
    success: boolean;
    message: string;
}>;
