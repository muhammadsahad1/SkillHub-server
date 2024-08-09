import { IprivacyRepository } from "../../../../usecases/interface/repositoryInterface/privacyRepository";
import { IprivacySettings } from "../../../../commonEntities/entities/user";
import PrivacyModal from "../model/privacyModel";
import { changePrivacy } from "./user";

export class PrivacyRepository implements IprivacyRepository {
  constructor(private privacyModel : typeof PrivacyModal){}

  
}