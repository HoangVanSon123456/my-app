import User from "types/User";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/member/user");
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
  const { data } = await http.get(`/member/user/${id}`);
  return data;
};

const UserService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default UserService;
