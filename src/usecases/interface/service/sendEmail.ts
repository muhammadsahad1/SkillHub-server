export interface IsendEmail {
  sentEmailVerification(name : string,email : string,verification : string): Promise< Boolean >
}