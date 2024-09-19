import { IEvent } from "../../../commonEntities/entities/event";
import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
export declare const getEvents: (next: Next, adminRepository: IadminRepository) => Promise<void | IEvent[]>;
