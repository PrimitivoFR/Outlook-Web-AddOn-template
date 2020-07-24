import { accessSync } from 'fs';

export class User {
    username: string;
    password: string;
}
export class LoggedUser {
    username: string;
    accessToken: string;
    uuid: string;

    constructor(username: string,
        accessToken: string,
        uuid: string) {
            
        this.username = username
        this.accessToken = accessToken;
        this.uuid = uuid;
    }

}