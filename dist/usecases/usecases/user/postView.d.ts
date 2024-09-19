import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const postView: (postId: string, userRepository: IuserRepository, s3: IS3Operations, next: Next) => Promise<any>;
