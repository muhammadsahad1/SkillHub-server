import { Iuser } from "../../../commonEntities/entities/user";
import { Next } from "../../../framework/types/serverPackageType";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const coverImageUpload: (userId: string, file: Express.Multer.File, s3: IS3Operations, userRepository: IuserRepository, next: Next) => Promise<Iuser | void>;
