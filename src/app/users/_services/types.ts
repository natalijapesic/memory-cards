export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  username: string;
  email: string;
  password: string;
  isAdmin: false;
};
