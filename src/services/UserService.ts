import User from "types/User";
import http from "./http";
import { getLocalStorage } from "configs/localStorage";
import { AUTH_KEYS } from "configs/auth";

const getListTeacher = async () => {
  const { data } = await http.get("/admin/teacher");
  return data;
};
const getListStrudent = async () => {
  const { data } = await http.get("/admin/student");
  return data;
};

const getListAll = async () => {
  const { data } = await http.get("/admin/user");
  return data;
};

const create = async (data: User) => {
  await http.post("/admin/user/create", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/user/delete/${id}`);
  return data;
};

const update = (id: number, data: User) => {
  return http.put(`/admin/user/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/user/${id}`);
  return data;
};

const getUser = async (id: number) => {
  const { data } = await http.get(`/authen/getUser/${id}`, {
    headers: {
      token: getLocalStorage(AUTH_KEYS.ACCESS_TOKEN),
    },
  });
  return data;
};

const getUserToken = async () => {
  const { data } = await http.get(`/authen/getToken`, {
    headers: {
      token: getLocalStorage(AUTH_KEYS.ACCESS_TOKEN),
    },
  });
  return data;
};

const searchUser = async (keyword: string) => {
  const { data } = await http.get(`/admin/user/search/${keyword}`);
  return data;
};

const UserService = {
  getListAll,

  getUserToken,
  getUser,
  searchUser,
  getListTeacher,
  getListStrudent,
  create,
  deleteItem,
  update,
  getById,
};
export default UserService;
