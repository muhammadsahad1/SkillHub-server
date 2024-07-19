export class UserUseCase {
    constructor(userRepostory, Jwt) {
        this.userRepostory = userRepostory;
        this.Jwt = Jwt;
    }
}
