export interface user {
  email: string;
  password: string;
}

export interface userInfo{
  uid?: string;
  email?: string;
  name?:string;
  photoUrl?: string,
  emailVerified?: boolean,
}
