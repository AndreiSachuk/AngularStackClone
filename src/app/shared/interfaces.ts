export interface UserInfo {
  uid?: string;
  email?: string;
  name?:string;
  photoUrl?: string,
  emailVerified?: boolean,
}

export interface Question{
  title: string,
  text: string,
  tags: string[],
  date: number,
  user: string,
  isApproved: boolean,
  comments: Array<Comments>
}

export interface Comments{
  text: string,
  date: Date,
  user: string,
  isDecision: boolean,
}



