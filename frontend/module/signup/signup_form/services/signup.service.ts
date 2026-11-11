import API from "@/app/api";
import axios from "axios";

export interface RegisterCredentials {
  name: string;
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

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join(", ");
    if (typeof message === "string") return message;
    return error.message;
  }

  if (error instanceof Error) return error.message;
  return fallback;
}

export const registerUser = async (
  credentials: RegisterCredentials,
): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>(
    "/auth/register",
    credentials,
  );

  return response.data;
};
