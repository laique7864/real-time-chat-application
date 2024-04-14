export interface UserCreateAttributes {
    id?: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    photo: string;
    createdAt?: number;
    updatedAt?: number;
    password:string;
  }
  