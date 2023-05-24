import Tuition from "types/Tuition";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/tuition");
  return data;
};

const create = async (data: Tuition) => {
  await http.post("/tuition/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/tuition/delete/${id}`);
  return data;
};

const update = (id: number, data: Tuition) => {
  return http.put(`/tuition/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/tuition/${id}`);
  return data;
};

const TuitionService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default TuitionService;
