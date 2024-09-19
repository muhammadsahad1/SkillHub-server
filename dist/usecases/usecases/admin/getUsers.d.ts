import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { Next } from "../../../framework/types/serverPackageType";
export declare const getUsers: (adminRepository: IadminRepository, next: Next) => Promise<import("../../../commonEntities/entities/user").Iuser[] | undefined>;
