export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface VerifyOtpPayload {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    mobile: string;
    name: string | null;
    role: string;
    refresh_token_hash?: string | null;
  };
}

// Define the expected shape of our API error
export interface ApiError extends Error {
  status: number;
  message: string;
}
