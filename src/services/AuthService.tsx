import http from "./http";

const login = async (email: string, password: string) => {
  return await http.post("/authen/login", { email, password });
};

const AuthService = {
  login,
};

export default AuthService;
