import API from "@/app/api";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const signInUser = async (
  credentials: SignInCredentials,
): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>(
    '/auth/login',
    credentials,
  );

  return response.data;
};