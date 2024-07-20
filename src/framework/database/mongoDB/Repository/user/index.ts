// /exporting each operation function for user/ 
import { createUser } from "./createUser";
import { findByEmail } from "./findbyEmail";
import { createProfile } from "./createProfile";
import { findByEmailUpdatePicture } from './findByEmailUpdatePicture'
import { findUpdateResetToken } from './findUpdateResetToken'

// exporting each functions of manipulation to DB
export {
  createUser,
  findByEmail,
  findByEmailUpdatePicture,
  createProfile,
  findUpdateResetToken
}