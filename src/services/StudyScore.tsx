import StudyScore from "types/StudyScore";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/admin/studyscore");
  return data;
};

const create = async (data: StudyScore) => {
  await http.post("/admin/studyscore/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/studyscore/delete/${id}`);
  return data;
};

const update = (id: number, data: StudyScore) => {
  return http.put(`/admin/studyscore/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/studyscore/${id}`);
  return data;
};

const StudyScoreService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default StudyScoreService;
