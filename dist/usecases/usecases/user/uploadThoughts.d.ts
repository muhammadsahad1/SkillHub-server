import { Ipost } from "../../../commonEntities/entities/post";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const uploadThoughts: (userId: string, thoughts: string, userRepository: IuserRepository, next: Next) => Promise<void | {
    success: boolean;
    thoughtPost: Ipost;
}>;
