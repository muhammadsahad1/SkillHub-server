import userModel from "../../model/userModel";
import { Iuser } from "../../../../../commonEntities/entities/user";
export declare const findByEmailUpdatePicture: (userModels: typeof userModel, email: string, picture: string) => Promise<Iuser | void | any>;
