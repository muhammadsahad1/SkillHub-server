
import { Next } from "../../../framework/types/serverPackageType.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

// Convert the date and time to ISO 8601 format
function convertToISO(date: string, time: string): string {
  console.log("date ==>",date , "time ===>",time )
  const dateTime = `${date.split('T')[0]}T${time}:00Z`; 
  console.log("date Time ==>",dateTime)
  return new Date(dateTime).toISOString();
}

export const getJoinLink = async (
  date: string,
  time: string,
  duration: string,
  next: Next,
  zoomService: any
): Promise<string | void> => {
  try {
    // Get Zoom access token
    const accessToken = await zoomService.getZoomAccessToken();
    
    if (!accessToken) {
      return next(new ErrorHandler(401, "AccessToken failed to generate"));
    }

    // Convert date and time to ISO 8601 format
    const isoStartTime = convertToISO(date, time);
    const Duration = Number(duration);

    // Create a Zoom meeting
    const meeting = await zoomService.createMeeting(accessToken, {
      topic: "Event Meeting",
      type: 2, 
      start_time: isoStartTime,
      duration: Duration,
      timezone: "UTC"
    });
    console.log("meeting data ==>",meeting)
    // Return the join URL from the Zoom meeting response
    return meeting?.join_url;
  } catch (error) {
    console.error("Error in getJoinLink:", error);
    return next(new ErrorHandler(500, "Internal server error"));
  }
};
