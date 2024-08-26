import { Next } from '../../framework/types/serverPackageType';
import { IEventRepository } from '../../usecases/interface/repositoryInterface/eventRepository'
import { IEventUseCase } from '../interface/usecase/eventUseCase';
import { createEvent } from '../usecases/event/index'

export class EventUseCase implements IEventUseCase {
  constructor(private eventRepository : IEventRepository){}

  async createEvent (next : Next){
    return await createEvent(next)
  }
}