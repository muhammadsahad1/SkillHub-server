import mongoose,{Model , Schema} from "mongoose";
import { IprivacySettings } from "../../../../commonEntities/entities/user";

const privacySchema: Schema<IprivacySettings>  = new mongoose.Schema({
  userId : { type :Schema.Types.ObjectId , ref : "User" , require : true},
  isProfilePublic : { type : Boolean , default : false }
})

const PrivacyModal: Model<IprivacySettings> = mongoose.model('PrivacySettings',privacySchema)
export default PrivacyModal