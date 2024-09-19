import { IGroup } from "../../../commonEntities/entities/group";
import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
export declare const getGroups: (next: Next, groupRepository: IGroupRepository) => Promise<IGroup[] | void>;
