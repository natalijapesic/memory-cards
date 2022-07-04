import { User } from '../_models';

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
  isAdmin: false;
  image: string;
};

export type StorageUser = {
  user: User;
  accessToken?: string;
};
