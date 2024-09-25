import { IEventRegister } from "../../../commonEntities/entities/eventRegister.js";
import { IStripeService } from "../../../framework/service/stripService.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const eventRegister = async (
  stripService : IStripeService,
  eventRegisterData: IEventRegister,
  eventRepository: IEventRepository,
  next: Next
): Promise<{
  success: boolean;
  message: string;
  joinToken?: string;
  paymentUrl?: string;
} | void> => {
  try {
    const result = await eventRepository.eventRegister(stripService,eventRegisterData);
    if (!result) {
      return next(new ErrorHandler(401, "eventRegisteration failed"));
    }
    return result;
  } catch (error) {
    return next(new ErrorHandler(500, "Internal server error "));
  }
};
