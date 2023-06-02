import Notification from "types/Notification";
import http from "./http";
import { getLocalStorage } from "configs/localStorage";
import { AUTH_KEYS } from "configs/auth";

const getList = async () => {
  const { data } = await http.get("/admin/notification");
  return data;
};

const create = async (data: Notification) => {
  await http.post("/admin/notification/add", data, {
    headers: {
      token: getLocalStorage(AUTH_KEYS.ACCESS_TOKEN),
    },
  });
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/notification/delete/${id}`);
  return data;
};

const update = (id: number, data: Notification) => {
  return http.put(`/admin/notification/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/notification/${id}`);
  return data;
};

const NotificationService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default NotificationService;
