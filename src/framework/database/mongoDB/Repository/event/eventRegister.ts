import { IEventRegister } from "../../../../../commonEntities/entities/eventRegister";
import EventModel from "../../model/eventModel";

export const eventRegister = async (
  eventRegisterData: IEventRegister,
  eventModel: typeof EventModel
) => {
  try {
    const { userId, eventId, name, email, phone, payment } = eventRegisterData;
    // const event = await eventModel.findByIdAndUpdate(eventId,{

    // });
    
  } catch (error) {}
};
