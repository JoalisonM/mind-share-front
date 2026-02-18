export interface User {
  id: string;
  name: string;
  email: string;
  role?: "USER" | "ADMIN" | "MEMBER" | "VIEWER";
  createdAt: string;
  updatedAt?: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
