import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { logout } from "../actions/logoutAction";

let hasRedirectedFor401 = false;

const axiosClientHelper = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosClientHelper.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!isAxiosError(error)) return Promise.reject(error);

    const { response } = error;
    const isOnLoginPage =
      typeof window !== "undefined" && window.location.pathname === "/login";

    if (response?.status === 401 && !hasRedirectedFor401 && !isOnLoginPage) {
      hasRedirectedFor401 = true;
      toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
      await logout();
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default axiosClientHelper;
