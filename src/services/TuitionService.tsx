import Tuition from "types/Tuition";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/admin/user_tuition", {
    headers: {
      userId: localStorage.getItem("userId"),
    },
  });
  return data;
};

const create = async (data: Tuition) => {
  await http.post("/admin/tuition/add", data, {
    headers: {
      userId: localStorage.getItem("userId"),
    },
  });
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

const TuitionService = {
  getList,
  create,
  deleteItem,
  update,
  getById,
};
export default TuitionService;
