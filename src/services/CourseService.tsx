import Course from "types/Course";
import http from "./http";
import { ApiResponse, DataListResponse } from "types/common/ApiResponse";

const getList = async () => {
  const { data } = await http.get("/admin/course");
  return data;
};

const create = async (data: Course) => {
  await http.post("/admin/course/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/course/delete/${id}`);
  return data;
};

const update = (id: number, data: Course) => {
  return http.put(`/admin/course/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/course/${id}`);
  return data;
};

const courseService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default courseService;
