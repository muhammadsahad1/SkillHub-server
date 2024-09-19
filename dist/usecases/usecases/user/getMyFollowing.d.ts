import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageType";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { IUserWithImages } from "../../../commonEntities/entities/user";
export declare const getMyFollowings: (userId: string, userRepository: IuserRepository, s3: IS3Operations, next: Next) => Promise<IUserWithImages[] | void>;
