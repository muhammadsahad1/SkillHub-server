import { IEventRegister } from "../../../commonEntities/entities/eventRegister";
import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";

export const eventRegister = async (
  eventRegisterData : IEventRegister,
  eventRepository : IEventRepository,
  next : Next
) => {
  try {
    const result = await eventRepository.eventRegister(eventRegisterData)
  } catch (error) {
    
  }
}