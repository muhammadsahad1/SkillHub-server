export interface IsendEmail {
  sentEmailVerification(name : string,email : string,verification : string): Promise< Boolean >
  sentResetLinkVerification(name : string,email : string,resetToken : string) : Promise <Boolean>
}