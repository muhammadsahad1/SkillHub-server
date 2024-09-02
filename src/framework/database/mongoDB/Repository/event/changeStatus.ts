import EventModel from "../../model/eventModel";

export const changeStatus = async (eventId : string,status: string, eventModel: typeof EventModel) => {
  try {
    
    await eventModel.findByIdAndUpdate(eventId,{
      eventStatus : status
    })

    return {
      success : true
    }

  } catch (error) {
    return {
      success : false
    }
    
  }
};
