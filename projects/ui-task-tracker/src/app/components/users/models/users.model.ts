export interface IUser {
  uid?: string;
  email: string | null;
  displayName?: string;
  password?: string;
}

export class User {
  constructor(
    public uid,
    public email,
    public displayName?
  ) {
  }
}
