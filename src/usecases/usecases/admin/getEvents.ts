import { IEvent } from "../../../commonEntities/entities/event";
import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const getEvents = async (
  next: Next,
  adminRepository : IadminRepository,
):Promise<void | IEvent[]> => {
  try {
    const result = await adminRepository.getEvents()
    if(!result){
      return next(new ErrorHandler(401,"failed to fetch the events request"))
    }
    return result 
  } catch (error) {}
};
