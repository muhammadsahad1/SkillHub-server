import { IEvent } from "../../../../../commonEntities/entities/event.js";
import { IS3Operations } from "../../../../service/s3Bucket.js";
import EventModel from "../../model/eventModel.js";

export const eventDetails = async (
  eventId: string,
  eventModel: typeof EventModel,
  s3Operations: IS3Operations
): Promise<IEvent | void | null> => {
  try {
    const event = await eventModel.findById(eventId);

    if (!event) {
      return null; // Return null if the event does not exist
    }
    // retrive the bannerImageUrl
    const bannerImageUrl = await s3Operations.getObjectUrl({
      bucket: process.env.C3_BUCKET_NAME,
      key: event?.bannerName as string,
    });

    if (!bannerImageUrl) {
      return null;
    }

    const eventDetails: IEvent = {
      ...event?.toObject(),
      bannerImageUrl,
    };
    console.log("eveDetails =>", eventDetails);
    return eventDetails;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
