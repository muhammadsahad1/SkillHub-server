import { IUserWithImages } from "../../../../../commonEntities/entities/user";
import { IS3Operations } from "../../../../service/s3Bucket";
export declare const getUsersImageUrls: (users: any[], followings: any[] | undefined, s3: IS3Operations) => Promise<IUserWithImages[] | undefined>;
