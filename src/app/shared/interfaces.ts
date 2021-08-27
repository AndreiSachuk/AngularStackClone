export interface UserInfo {
  uid?: string;
  email?: string;
  name?:string;
  displayName?: string;
  photoUrl?: string,
  emailVerified?: boolean,
}

export interface Comments{
  text: string,
  date: number,
  user: string,
  isDecision: boolean,
}

export interface Question{
  id?: string;
  name?: string,
  title: string,
  text: string,
  tags: string[],
  date: number,
  user: string,
  isApproved: boolean,
  isResolved?: boolean,
  comments: Comments[]
}

export interface FbResponse{
  name?: string
}

