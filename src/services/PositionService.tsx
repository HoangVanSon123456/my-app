import Position from "types/Position";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/admin/position");
  return data;
};

const create = async (data: Position) => {
  await http.post("/admin/position/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/position/delete/${id}`);
  return data;
};

const update = (id: number, data: Position) => {
  return http.put(`/admin/position/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/position/${id}`);
  return data;
};

const positionService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default positionService;
