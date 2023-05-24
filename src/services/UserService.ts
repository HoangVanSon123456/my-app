import User from "types/User";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/user");
  return data;
};

const create = async (data: User) => {
  await http.post("/user/create", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/user/delete/${id}`);
  return data;
};

const update = (id: number, data: User) => {
  return http.put(`/user/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/user/${id}`);
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
