import { IEvent } from "../../../../../commonEntities/entities/event.js";
import { IS3Operations } from "../../../../service/s3Bucket.js";
import EventModel from "../../model/eventModel.js";

const EVENT_PER_PAGE = 3;

export const getEvents = async (
  pageNumber: number,
  eventModel: typeof EventModel,
  s3: IS3Operations
): Promise<IEvent[]> => {
  try {

    const statusOrder = {
      "Upcoming": 1,
      "Ongoing": 2,
      "Completed": 3,
    };
    
    // Sort based on the custom status order
    const events = await eventModel
      .find({ approvalStatus: "Approved" })
      .skip((pageNumber - 1) * EVENT_PER_PAGE)
      .limit(EVENT_PER_PAGE)
      .sort({
        eventStatus: {
          $meta: statusOrder // Incorrect; simply sort using the status order
        },
        createdAt: -1
      })
      .exec();
      
    const eventsWithBannerImage = await Promise.all(
      events.map(async (event) => {
        const bannerImageUrl = await s3.getObjectUrl({
          bucket: process.env.C3_BUCKET_NAME,
          key: event?.bannerName ? event?.bannerName : "",
        });

        return {
          ...event.toObject(),
          bannerImageUrl: bannerImageUrl,
        };
      })
    );

    return eventsWithBannerImage;
  } catch (error) {
    console.error(error);
    return [];
  }
};
