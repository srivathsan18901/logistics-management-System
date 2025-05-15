export interface IUser {
    _id: string;
    username: string;
    role: 'admin' | 'operator';
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface IAuthResponse {
    token: string;
    user: IUser;
  }