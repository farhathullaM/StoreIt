export interface LoginResponse {
  accessToken: string;
}

export type RefreshTokenResponse = LoginResponse;

export interface FailedRequest {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}
