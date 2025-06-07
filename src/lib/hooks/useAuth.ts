import { useMutation } from "@tanstack/react-query";
import {
  LoginRequest,
  AuthResponse,
  RefreshTokenResponse,
  SignUpRequest,
  OauthRequest,
  OauthAppRequest,
  OAuthAppResponse,
} from "../types/auth";
import {
  login,
  oauthApps,
  oauthLogin,
  refreshToken,
  signUp,
} from "../apis/auth";

// 회원가입 훅
export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpRequest) => signUp(data),
  });
};

// 로그인 훅
export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: () => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("hasRedirectedFor401");
      }
    },
  });
};

// 토큰 갱신 훅
export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, Error, void>({
    mutationFn: refreshToken,
  });
};

// 간편 로그인 App 등록/수정 훅
export const useOauthApps = (params: OauthAppRequest) => {
  return useMutation<OAuthAppResponse, Error, OauthAppRequest>({
    mutationFn: () => oauthApps(params),
  });
};

// 간편 로그인 훅
export const useOauthLogin = (provider: "google" | "naver" | "kakao") => {
  return useMutation<AuthResponse, Error, OauthRequest>({
    mutationFn: async (data: OauthRequest) => {
      return oauthLogin(provider, data);
    },
  });
};
