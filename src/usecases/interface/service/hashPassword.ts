export interface IhashPassword {
  createHash(password: string | undefined): Promise<string>;
  comparePassword(password: string, hashPassword: string): Promise<Boolean>;
}
