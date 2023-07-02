import Subject from "types/Subject";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/admin/subject");
  return data;
};

const create = async (data: Subject) => {
  await http.post("/admin/subject/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/subject/delete/${id}`);
  return data;
};

const update = (id: number, data: Subject) => {
  return http.put(`/admin/subject/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/subject/${id}`);
  return data;
};

const SubjectService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default SubjectService;
