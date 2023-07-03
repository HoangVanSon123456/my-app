import RestSchedule from "types/RestSchedule";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/admin/restSchedule");
  return data;
};

const create = async (data: RestSchedule) => {
  await http.post("/admin/restSchedule/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/restSchedule/delete/${id}`);
  return data;
};

const update = (id: number, data: RestSchedule) => {
  return http.put(`/admin/restSchedule/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/restSchedule/${id}`);
  return data;
};

const restScheduleService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default restScheduleService;
