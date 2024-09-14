import mongoose from "mongoose";
const generateRandomString = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
export const createOrUpdateEvent = async (userId, data, bannerFile, s3, eventModel) => {
    try {
        console.log("data ==>", data);
        const { eventId, title, description, date, duration, speaker, time, category, price, currency, } = data;
        // Find existing event if eventId is provided
        let existingEvent = null;
        if (eventId) {
            existingEvent = await eventModel.findById(eventId);
            if (!existingEvent) {
                return {
                    success: false,
                    message: "Event not found",
                };
            }
        }
        // Store the image in the S3 bucket and retrieve the banner name
        let bannerName = existingEvent?.bannerName || ""; // Use existing banner name if no new file
        if (bannerFile) {
            const { originalname, buffer, mimetype } = bannerFile;
            const PutObjectParams = { originalname, buffer, mimetype };
            bannerName = await s3.putObjectUrl(PutObjectParams);
        }
        const eventDate = date ? new Date(date) : existingEvent?.date;
        const eventDuration = duration !== undefined ? Number(duration) : existingEvent?.duration;
        const priceValue = price !== undefined ? Number(price) : existingEvent?.price;
        if (existingEvent) {
            // Update existing event
            await eventModel.findByIdAndUpdate(eventId, {
                title: title || existingEvent.title,
                description: description || existingEvent.description,
                date: eventDate,
                time: time || existingEvent.time,
                duration: eventDuration,
                speaker: speaker || existingEvent.speaker,
                category: category || existingEvent.category,
                price: priceValue,
                currency: currency || existingEvent.currency,
                bannerName, // Updated or existing banner name
            });
            return {
                success: true,
                message: "Event updated successfully",
            };
        }
        else {
            // Create new event
            const newEvent = {
                title,
                description,
                date: eventDate,
                time,
                duration: eventDuration,
                speaker,
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
        }
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to create or update the event",
        };
    }
};
