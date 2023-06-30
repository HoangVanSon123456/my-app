import Tuition from "types/Tuition";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/admin/tuition");
  return data;
};

const create = async (data: Tuition) => {
  await http.post("/admin/tuition/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/tuition/delete/${id}`);
  return data;
};

const update = (id: number, data: Tuition) => {
  return http.put(`/admin/tuition/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/tuition/${id}`);
  return data;
};

const searchTuition = async (keyword: string) => {
  const { data } = await http.get(`/admin/tution/search/${keyword}`);
  return data;
};

const TuitionService = {
  searchTuition,
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default TuitionService;
