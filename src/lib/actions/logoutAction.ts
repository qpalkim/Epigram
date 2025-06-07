"use server";
import { cookies } from "next/headers";
import { getErrorMessage } from "@/lib/network/errorMessage";

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return {
      status: true,
      error: "",
    };
  } catch (error) {
    return { status: false, error: getErrorMessage(error) };
  }
};
