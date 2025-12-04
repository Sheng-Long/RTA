import axios from "axios";
import type { User } from "../context/AuthContext";
import api, { type ErrorItems } from "./internal/axios";

export class BadPasswordError extends Error {
  constructor() {
    super();
    this.name = "BadPasswordError";
  }
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export async function createSession(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  try {
    const response = await api.post<LoginResponse>("/auth/login", { email, password });
    
    if (response.data.success && response.data.data) {
      return {
        user: response.data.data.user,
        token: response.data.data.token,
      };
    }
    
    throw new Error("Login response missing user or token data");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      const errorResponse = error.response as {
        data?: { errors: ErrorItems };
      };
      if (errorResponse?.data?.errors[0].code === "WrongLogin") {
        throw new BadPasswordError();
      }
    }

    throw error;
  }
}
