import { IGroup } from "../../../commonEntities/entities/group";
import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
export declare const getGroup: (groupId: string, groupRepository: IGroupRepository, next: Next) => Promise<IGroup | void>;
