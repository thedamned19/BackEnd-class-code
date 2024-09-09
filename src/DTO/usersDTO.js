export class UsersDTO {
    constructor(user) {
        this.firstname = user.name;
        this.lastname = user.lastname? user.lastname : null;
        this.fullname = user.lastname? `${this.firstname} ${this.lastname}`: this.firstname;
        this.e_mail = user.e_mail;
        this.role = "user";
    }
}