import { Ipost } from "../../../../../commonEntities/entities/post";
import PostModel from "../../model/postModel";
export declare const uploadThoughts: (userId: string, thoughts: string, postModal: typeof PostModel) => Promise<{
    success: boolean;
    thoughtPost: Ipost;
} | void>;
