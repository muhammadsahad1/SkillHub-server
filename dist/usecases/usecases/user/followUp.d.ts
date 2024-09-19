import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageType";
export declare const followUp: (toFollowingId: string, fromFollowerId: string, userRepository: IuserRepository, next: Next) => Promise<void>;
