import { IGroup } from "../../../commonEntities/entities/group";
import { Next } from "../../../framework/types/serverPackageType";

export interface IgroupUseCase {
  createGroup(
    groupData: IGroup,
    creatorId: string,
    groupImageFile: Express.Multer.File | undefined,
    next: Next
  ): Promise<{ success: boolean; message: string } | void>;
}
