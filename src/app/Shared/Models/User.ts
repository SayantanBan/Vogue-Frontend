interface IUser {
    id?: number,
    firstName?: string,
    lastName?: string,
}

export class User implements IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
}