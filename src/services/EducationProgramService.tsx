import EducationProgram from "types/EducationProgram";
import http from "./http";
import EduProCourse from "types/EduProCourse";

const getList = async () => {
  const { data } = await http.get("/admin/educationProgram");
  return data;
};

const create = async (data: EducationProgram) => {
  await http.post("/admin/educationProgram/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/educationProgram/delete/${id}`);
  return data;
};

const update = (id: number, data: EducationProgram) => {
  return http.put(`/admin/educationProgram/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/educationProgram/${id}`);
  return data;
};

const createCourseEdu = async (data: EduProCourse) => {
  await http.post("/admin/edu-course/add", data, {
    headers: {
      eduId: localStorage.getItem("eduId"),
    },
  });
  return data;
};

const EducationProgramService = {
  createCourseEdu,
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default EducationProgramService;
