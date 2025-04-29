import { z } from "zod";

// 회원가입 요청 API 타입
export const signupRequestSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "이메일은 필수 입력입니다." })
      .email({ message: "유효한 이메일 형식으로 작성해 주세요." })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: "올바른 이메일 형식이 아닙니다.",
      }),
    password: z
      .string()
      .min(1, { message: "비밀번호는 필수 입력입니다." })
      .min(8, { message: "8자 이상 입력해 주세요." })
      .regex(/^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/, {
        message: "숫자, 영어, 특수문자 포함 8자 이상 입력해 주세요.",
      }),
    passwordConfirmation: z
      .string()
      .min(1, { message: "비밀번호를 한번 더 입력해 주세요." }),
    nickname: z
      .string()
      .min(1, { message: "닉네임을 입력해 주세요." })
      .max(30, { message: "닉네임은 30자 이하로 입력해 주세요." }),
    image: z.string().url().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirmation"],
  });

export type SignupRequest = z.infer<typeof signupRequestSchema>;

// 로그인 요청 API 타입
export const loginRequestSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일은 필수 입력입니다." })
    .email({ message: "유효한 이메일 형식으로 작성해 주세요." })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z
    .string()
    .min(1, { message: "비밀번호는 필수 입력입니다." })
    .min(8, { message: "8자 이상 입력해 주세요." })
    .regex(/^([a-z]|[A-Z]|[0-9]|[!@#$%^&*])+$/),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;

// 간편 로그인 App 등록/수정 요청 API 타입
export const oauthAppRequestSchema = z.object({
  appKey: z.string(),
  appSecret: z.string().optional(),
  provider: z.enum(["google", "naver", "kakao"]),
});

export type OauthAppRequest = z.infer<typeof oauthAppRequestSchema>;

// 간편 로그인 App 등록/수정 응답 API 타입
export const oauthAppResponseSchema = z.object({
  id: z.number().min(1),
  teamId: z.string(),
  provider: z.enum(["google", "naver", "kakao"]),
  appKey: z.string(),
  appSecret: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type OAuthAppResponse = z.infer<typeof oauthAppResponseSchema>;

// 간편 로그인 요청 API 타입
export const oauthRequestSchema = z.object({
  state: z.string(),
  redirectUri: z.string().url(),
  token: z.string(),
});

export type OauthRequest = z.infer<typeof oauthRequestSchema>;

// 회원가입/로그인 및 간편 로그인 응답 API 타입
export const authResponseSchema = z.object({
  user: z.object({
    id: z.number().min(1),
    email: z.string().email(),
    nickname: z.string().min(1).max(30),
    image: z.string().url().nullable(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    teamId: z.string(),
  }),
  refreshToken: z.string().optional(),
  accessToken: z.string().optional(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// 토큰 갱신 응답 API 타입
export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
});

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
