export interface User {
  id?: number;
  username: string;
  email: string;
  fullName?: string;
  phone?: string;
  roles?: string[];
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
  roles?: string[];
}

export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}
