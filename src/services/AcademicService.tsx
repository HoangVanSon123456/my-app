import Academic from "types/Academic";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/admin/academic");
  return data;
};

const create = async (data: Academic) => {
  await http.post("/admin/academic/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/academic/delete/${id}`);
  return data;
};

const update = (id: number, data: Academic) => {
  return http.put(`/admin/academic/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/academic/${id}`);
  return data;
};

const AcademicService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default AcademicService;
