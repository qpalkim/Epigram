import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { getExpirationDate } from "./getExpirationDate";

const axiosServerHelper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosServerHelper.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (accessToken?.value)
    config.headers.Authorization = `Bearer ${accessToken.value}`;

  return config;
});

axiosServerHelper.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError(error)) return Promise.reject(error);

    const { response, config } = error;
    const status = response?.status;

    if (status !== 401 && status !== 403) return Promise.reject(error);

    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const currentAccessToken = cookieStore.get("accessToken")?.value;
    if (!refreshToken) return Promise.reject(error);

    let res: unknown;

    try {
      res = await fetch(`${baseURL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentAccessToken}`,
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      }).then((value) => value.json());
    } catch {
      return Promise.reject(error);
    }

    if (!res || typeof res !== "object" || !("accessToken" in res)) {
      return Promise.reject(error);
    }

    const newAccessToken = (res as { accessToken?: string }).accessToken;
    if (!config || !newAccessToken) return Promise.reject(error);

    const accessTokenExp = getExpirationDate(newAccessToken);
    const refreshTokenExp = getExpirationDate(refreshToken);
    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    };

    cookieStore.set("accessToken", newAccessToken, {
      ...cookieOptions,
      expires: accessTokenExp || undefined,
    });

    cookieStore.set("refreshToken", refreshToken, {
      ...cookieOptions,
      expires: refreshTokenExp || undefined,
    });

    config.headers.Authorization = `Bearer ${newAccessToken}`;

    return axiosServerHelper(config);
  }
);

export default axiosServerHelper;
