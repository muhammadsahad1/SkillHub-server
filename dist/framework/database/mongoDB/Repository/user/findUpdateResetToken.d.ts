import userModel from "../../model/userModel";
import { Iuser } from "../../../../../commonEntities/entities/user";
export declare const findUpdateResetToken: (userModels: typeof userModel, email: string, resetToken: string) => Promise<Iuser | any>;
