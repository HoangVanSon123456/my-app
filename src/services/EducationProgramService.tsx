import EducationProgram from "types/EducationProgram";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/educationProgram");
  return data;
};

const create = async (data: EducationProgram) => {
  await http.post("/educationProgram/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/educationProgram/delete/${id}`);
  return data;
};

const update = (id: number, data: EducationProgram) => {
  return http.put(`/educationProgram/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/educationProgram/${id}`);
  return data;
};

const EducationProgramService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default EducationProgramService;
