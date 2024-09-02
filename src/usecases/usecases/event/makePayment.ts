import { IStripeService } from "../../../framework/service/stripService";
import { Next } from "../../../framework/types/serverPackageType";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const makePayment = async (
  stripService : IStripeService,
  eventPrice : string,
  eventId : string,
  userId : string,
  next : Next
):Promise< string | void> => {
  try {
    const price = Number(eventPrice)
    const sessionId = await stripService.createCheckoutSession(price,eventId,userId)
    if(!sessionId){
      return next(new ErrorHandler(401,"stripservice didnt return sessionId "))
    }
    return sessionId
  } catch (error) {
    return next (new ErrorHandler(500,"Internal server error"))
  }
}