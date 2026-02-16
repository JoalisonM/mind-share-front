export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface SigninInput {
  email: string;
  password: string;
}
