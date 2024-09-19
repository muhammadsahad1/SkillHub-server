import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const editPost: (caption: string, postId: string, userRepository: IuserRepository, next: Next) => Promise<any>;
