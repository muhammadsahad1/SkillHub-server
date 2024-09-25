import { IEvent } from "../../../commonEntities/entities/event.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository.js";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

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
