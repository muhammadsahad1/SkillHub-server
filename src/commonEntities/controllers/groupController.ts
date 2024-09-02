import { Next, Req, Res } from "../../framework/types/serverPackageType";
import { IgroupUseCase } from "../../usecases/interface/usecase/groupUseCase";
import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";

export class GroupController {
  constructor(private groupUseCase : IgroupUseCase) {}
  async createGroup(req: Req, res: Res, next: Next) {
    try {
      const { groupData } = req.body;
      const creatorId = req.user?.id as string;
      const result = await this.groupUseCase.createGroup(groupData,creatorId,req.file,next);
      if(result){
        res.status(200).json(result)
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }

  }
}
