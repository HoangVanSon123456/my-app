import Course from "types/Course";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/admin/course");
  return data;
};

const create = async (param: Course) => {
  const { data } = await http.post("/admin/course/add", param);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/course/delete/${id}`);
  return data;
};

const deleteEduItem = async (courseId: number, educationProgramId: number) => {
  const { data } = await http.delete(
    `/admin/edu-course/delete/${courseId}/${educationProgramId}`
  );
  return data;
};

const update = (id: number, data: Course) => {
  return http.put(`/admin/course/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/course/${id}`);
  return data;
};

const getCourseByEdu = async (eduId: number) => {
  const { data } = await http.get(`/admin/edu-course/${eduId}`);
  return data;
};

const searchCourse = async (keyword: string) => {
  const { data } = await http.get(`/admin/course/search/${keyword}`);
  return data;
};

const CourseService = {
  searchCourse,
  getCourseByEdu,
  getList,
  create,
  deleteItem,
  deleteEduItem,
  update,
  getById,
};
export default CourseService;
