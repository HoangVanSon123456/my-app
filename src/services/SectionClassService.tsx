import SectionClass from "types/SectionClass";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/admin/sectionClass");
  return data;
};

const create = async (data: SectionClass) => {
  await http.post("/admin/sectionClass/add", data);
  return data;
};

const deleteItem = async (id: number) => {
  const { data } = await http.delete(`/admin/sectionClass/delete/${id}`);
  return data;
};

const update = (id: number, data: SectionClass) => {
  return http.put(`/admin/sectionClass/update/${id}`, data);
};

const getById = async (id: number) => {
  const { data } = await http.get(`/admin/sectionClass/${id}`);
  return data;
};

const getSectionClassByEdu = async (id: number) => {
  const { data } = await http.get(`/admin/edu-sectionClass/${id}`);
  return data;
};

const searchSectionClass = async (keyword: string) => {
  const { data } = await http.get(`/admin/studyscore/search/${keyword}`);
  return data;
};

const SectionClassService = {
  searchSectionClass,
  getSectionClassByEdu,
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default SectionClassService;
