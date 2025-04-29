import axiosClientHelper from "../network/axiosClientHelper";
import { safeResponse } from "../network/safeResponse";
import {
  LoginRequest,
  AuthResponse,
  authResponseSchema,
  RefreshTokenResponse,
  refreshTokenResponseSchema,
  OauthRequest,
  SignupRequest,
  signupRequestSchema,
  OauthAppRequest,
  OAuthAppResponse,
  oauthAppResponseSchema,
} from "../types/auth";

// 회원가입 요청 API
export const signup = async (params: SignupRequest) => {
  const response = await axiosClientHelper.post<AuthResponse>(
    "/auth/signUp",
    params
  );
  return safeResponse(response.data, signupRequestSchema);
};

// 로그인 요청 API
export const login = async (data: LoginRequest) => {
  const response = await axiosClientHelper.post<AuthResponse>(
    "/auth/signIn",
    data
  );
  return safeResponse(response.data, authResponseSchema);
};

// 토큰 갱신 요청 API
export const refreshToken = async () => {
  const response = await axiosClientHelper.post<RefreshTokenResponse>(
    "auth/refresh-token",
    {},
    {
      withCredentials: true,
    }
  );
  return safeResponse(response.data, refreshTokenResponseSchema);
};

// 간편 로그인 App 등록/수정 API
export const oauthApps = async (params: OauthAppRequest) => {
  const response = await axiosClientHelper.post<OAuthAppResponse>(
    "/oauthApps",
    params
  );
  return safeResponse(response.data, oauthAppResponseSchema);
};

// 간편 로그인 API
export const oauthLogin = async (
  provider: "google" | "naver" | "kakao",
  data: OauthRequest
) => {
  const response = await axiosClientHelper.post<AuthResponse>(
    `/oauth/signIn/${provider}`,
    data
  );
  return safeResponse(response.data, authResponseSchema);
};
