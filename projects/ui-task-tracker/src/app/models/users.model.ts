export interface User {
    uid: string;
    email?: string | null;
    photoURL?: string;
    displayName?: string;
}

export interface IUsers {
    users: User[];
}
