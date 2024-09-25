import { IhashPassword } from "../../usecases/interface/service/hashPassword";
import bcrypt from 'bcryptjs'

export class Encrypt implements IhashPassword {
  constructor(){}

  async createHash(password: string): Promise<string> {
      const hashPassword = await bcrypt.hash(password,10)
      return hashPassword
  }

  async comparePassword(password: string, hashPassword: string): Promise<Boolean> {
      const matchedPassword = await bcrypt.compare(password,hashPassword)
      return matchedPassword
  }
}