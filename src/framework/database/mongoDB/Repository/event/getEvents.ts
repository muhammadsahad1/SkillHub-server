import { IEvent } from "../../../../../commonEntities/entities/event";
import { IS3Operations } from "../../../../service/s3Bucket";
import EventModel from "../../model/eventModel";

export const getEvents = async (
  eventModel: typeof EventModel,
  s3: IS3Operations
): Promise<IEvent[] | void> => {
  try {
    const events = await eventModel.find({});
    // retrive the events and banner image url
    const eventsWithBannerImage = await Promise.all(
      events.map(async (event) => {
        const bannerImageUrl = await s3.getObjectUrl({
          bucket: process.env.C3_BUCKET_NAME,
          key: event.bannerName ? event.bannerName : "",
        });

        return {
          ...event.toObject(),
          bannerImageUrl,
        };
      })
    );

    return eventsWithBannerImage;
  } catch (error) {
    console.error(error);
  }
};
