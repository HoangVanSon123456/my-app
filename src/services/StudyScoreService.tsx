import StudyScore from "types/StudyScore";
import http from "./http";

const getList = async () => {
  const { data } = await http.get("/admin/user_studyscore", {
    headers: {
      userId: localStorage.getItem("userId"),
    },
  });
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

const getStudyScoreBySectionClass = async (sectionClassId: number) => {
  const { data } = await http.get(
    `/admin/sectionScore_studyScore/${sectionClassId}`
  );
  return data;
};

const createStudyScoreBySectionClass = async (data: StudyScore) => {
  await http.post("/admin/studyscore/add", data, {
    headers: {
      sectionScoreId: localStorage.getItem("sectionScoreId"),
    },
  });
  return data;
};

const searchStudyScore = async (keyword: string) => {
  const { data } = await http.get(`/admin/studyscore/search/${keyword}`);
  return data;
};

const StudyScoreService = {
  searchStudyScore,
  createStudyScoreBySectionClass,
  getStudyScoreBySectionClass,
  getList,
  deleteItem,
  update,
  getById,
};
export default StudyScoreService;
