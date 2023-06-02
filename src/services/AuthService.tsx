import { getLocalStorage } from "configs/localStorage";
import http from "./http";
import { AUTH_KEYS } from "configs/auth";

const login = async (email: string, password: string) => {
  return await http.post("/authen/login", { email, password });
};

const logout = async () => {
  return await http.get(`/authen/logout`, {
    headers: {
      token: getLocalStorage(AUTH_KEYS.ACCESS_TOKEN),
    },
  });
};

const AuthService = {
  logout,
  login,
};

export default AuthService;
