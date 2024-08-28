import mongoose from "mongoose";
import { ICreateEvent } from "../../../../../commonEntities/entities/event";
import { IS3Operations } from "../../../../service/s3Bucket";
import EventModel from "../../model/eventModel";

export const createEvent = async (
  userId: string,
  data: ICreateEvent,
  bannerFile: Express.Multer.File | undefined,
  s3: IS3Operations,
  eventModel: typeof EventModel
): Promise<{ success: boolean; message: string } | void> => {
  try {

    const {
      title,
      description,
      date,
      duration,
      registrationLink,
      accessLink,
      speaker,
      time,
      category,
      price,
      currency,
    } = data;

    // Store the image in the S3 bucket and retrieve the banner name
    let bannerName = "";
    if (bannerFile) {
      const { originalname, buffer, mimetype } = bannerFile;
      const PutObjectParams = { originalname, buffer, mimetype };
      bannerName = await s3.putObjectUrl(PutObjectParams);
    }

    const eventDate = new Date(date);
    const eventDuration = Number(duration);
    const priceValue = Number(price);
    // Create the new event object with all required fields
    const newEvent = {
      title,
      description,
      date: eventDate,
      time,
      duration: eventDuration,
      speaker,
      bannerName,
      registrationLink,
      accessLink,
      category,
      price: priceValue,
      currency,
      createdBy: new mongoose.Types.ObjectId(userId),
    };

    // Save the event to the database
    const result = await eventModel.create(newEvent);

    return {
      success: true,
      message: "Create Event request is successful",
    };

  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to create the event",
    };
  }
};
