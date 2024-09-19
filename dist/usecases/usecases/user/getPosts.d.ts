import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const getPosts: (userSKill: string, pageParam: number, s3: IS3Operations, userRepository: IuserRepository, next: Next) => Promise<void | import("../../../commonEntities/entities/post").Ipost[]>;
