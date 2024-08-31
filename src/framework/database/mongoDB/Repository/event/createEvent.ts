import mongoose from "mongoose";
import { ICreateEvent } from "../../../../../commonEntities/entities/event";
import { IS3Operations } from "../../../../service/s3Bucket";
import EventModel from "../../model/eventModel";
import { IZegoService } from "../../../../service/zegoService";


const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};


export const createEvent = async (
  userId: string,
  data: ICreateEvent,
  bannerFile: Express.Multer.File | undefined,
  s3: IS3Operations,
  eventModel: typeof EventModel,
  zegoService: IZegoService,
): Promise<{ success: boolean; message: string; } | void> => {
  try {
    console.log("data ==>", data);
    console.log("tile ==>", data.title);

    const {
      title,
      description,
      date,
      duration,
      speaker,
      time,
      category,
      price,
      currency,
    } = data;

    const registerLink = generateRandomString(10)

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
      registerLink,
      bannerName,
      category,
      price: priceValue,
      currency,
      createdBy: new mongoose.Types.ObjectId(userId),
    };

    // Save the event to the database
    const result = await eventModel.create(newEvent);

    console.log("new Event ==>", result);

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
