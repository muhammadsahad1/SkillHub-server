export interface IEventUseCase {
  createEvent(
    title: string,
    description: string,
    date: string,
    time: string,
    duration: string,
    speaker: string,
    registrationLink: string,
    accessLink: string,
    category: string,
    bannerFile: Express.Multer.File | undefined
  ): Promise<{success : boolean , message : string}>;
}
