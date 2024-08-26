import { IEventRepository } from "../../../../usecases/interface/repositoryInterface/eventRepository";
import EventModel from "../model/eventModel";

export class EventRepository implements IEventRepository {
  constructor(private eventModel : typeof EventModel){}
}