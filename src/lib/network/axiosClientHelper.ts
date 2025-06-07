import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { logout } from "../actions/logoutAction";

const axiosClientHelper = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const hasAlreadyRedirected = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("hasRedirectedFor401") === "true";
};

const markRedirected = () => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("hasRedirectedFor401", "true");
};

axiosClientHelper.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!isAxiosError(error)) return Promise.reject(error);

    const { response } = error;
    const isOnLoginPage =
      typeof window !== "undefined" && window.location.pathname === "/login";

    const alreadyRedirected = hasAlreadyRedirected();

    if (response?.status === 401 && !alreadyRedirected && !isOnLoginPage) {
      markRedirected();
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
