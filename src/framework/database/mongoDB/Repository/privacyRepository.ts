import { IprivacyRepository } from "../../../../usecases/interface/repositoryInterface/privacyRepository";
import { IprivacySettings } from "../../../../commonEntities/entities/user";
import PrivacyModal from "../model/privacyModel";
import { changePrivacy } from "./user";

export class PrivacyRepository implements IprivacyRepository {
  constructor(private privacyModel : typeof PrivacyModal){}

  async changePrivacy(userId: string, isPrivacy: boolean ): Promise<IprivacySettings | undefined> {
      return await changePrivacy(userId,isPrivacy,this.privacyModel)
  }
  
}