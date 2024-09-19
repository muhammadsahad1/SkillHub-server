import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";
export declare const getUserDetails: (userId: string, userModels: typeof userModel) => Promise<Iuser | any>;
