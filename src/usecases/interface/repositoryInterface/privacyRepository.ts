import { IprivacySettings } from "../../../commonEntities/entities/user";

export interface IprivacyRepository {
  changePrivacy(userId: string, isPrivacy: boolean): Promise<IprivacySettings | undefined>;
}
