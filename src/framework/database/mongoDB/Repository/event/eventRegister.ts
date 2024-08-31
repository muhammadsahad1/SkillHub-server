import mongoose from "mongoose";
import { IEventRegister } from "../../../../../commonEntities/entities/eventRegister";
import EventModel from "../../model/eventModel";
import { EventPaymentModel } from "../../model/eventPaymentModel";

//generate the token 
const generateJoinToken = (length = 20) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const eventRegister = async (
  eventRegisterData: IEventRegister,
  eventModel: typeof EventModel,
  eventPaymentModel: typeof EventPaymentModel
):Promise<{success : boolean ,message : string ,joinToken ?: string}> => {
  try {
    const { userId, eventId, name, email, phone, paymentId } = eventRegisterData;

    const eventID = new mongoose.Types.ObjectId(eventId);
    const event = await eventModel.findById(eventID);

    if (!event) {
      return {
        success: false,
        message: "Event not found",
      };
    }

    const isAttendee = event.attendees.some((attend : any) => attend?.userId.toString() === userId);
    
    if (isAttendee) {
      return {
        success: false,
        message: "User already registered",
      };
    }

    if (event.price > 0) {
      if (!paymentId) {
        return {
          success: false,
          message: "Payment is required for this event",
        };
      }
      const payment = await eventPaymentModel.findOne({ paymentId });

      if (!payment || payment.status !== "succeeded") {
        return {
          success: false,
          message: "Payment not verified or failed",
        };
      }
      // getting the token
      const joinToken = generateJoinToken();
      //  updating the attendes payment event usr 
      await eventModel.findByIdAndUpdate(eventID, {
        $push: {
          attendees: {
            userId,
            paymentStatus: "Completed",
            stripePaymentId: paymentId,
            joinToken,
          },
        },
      });

      return {
        success: true,
        message: "Registration successful",
        joinToken, 
      };
    } else {
      const joinToken = generateJoinToken();
      // updating the attendes free event user 
      const regiEvnt = await eventModel.findByIdAndUpdate(eventID, {
        $push: {
          attendees: {
            userId,
            paymentStatus: "Not Required",
            joinToken,
          },
        },
      });

      console.log("registerEVnt ===>",regiEvnt)

      return {
        success: true,
        message: "Registration successful",
        joinToken, 
      };
    }

  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "An error occurred during registration",
    };
  }
};
