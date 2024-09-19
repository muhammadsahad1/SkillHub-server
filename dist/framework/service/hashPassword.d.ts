import { IhashPassword } from "../../usecases/interface/service/hashPassword";
export declare class Encrypt implements IhashPassword {
    constructor();
    createHash(password: string): Promise<string>;
    comparePassword(password: string, hashPassword: string): Promise<Boolean>;
}
