import { IEvent } from "../../../../../commonEntities/entities/event";
import EventModel from "../../model/eventModel";
import userModel from "../../model/userModel";

export const getEvents = async (
  eventModel: typeof EventModel,
  userModels: typeof userModel
): Promise<IEvent[] | void> => {
  try {

    const result = await eventModel.find({});

    if (!result) {
      return [];
    }
    // retriving the userName with events 
    const userNameWithEvent = await Promise.all(
      result.map(async (event) => {
        const user = await userModels.findById(event.createdBy).select("name");
        return {
          ...event.toObject(),
          userName: user?.name,
        };
      })
    );
    console.log("result ===>",userNameWithEvent)
    return userNameWithEvent;

  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
