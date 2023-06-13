import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Course from "types/Course";
import ListEducationProgramCourse from "../components/ListEducationProgramCourse";
import CourseService from "services/CourseService";

export default function EducationProgramCourse() {
  const [listCourse, setCourseList] = useState<Course[]>([]);
  const { eduId } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (eduId) {
      getEduProgramCourse(+eduId);
    }
  }, [eduId]);

  const getEduProgramCourse = async (eduId: number) => {
    await CourseService.getCourseByEdu(eduId)
      .then((res) => {
        setCourseList(res);
        localStorage.setItem("eduId", String(eduId));
      })
      .catch((err) => console.log(err));
  };

  const handleClickOpen = async () => {
    navigator("/chuongtrinhdaotao/createCourse");
  };

  const handleDelete = async (id: number, eduId: number) => {
    await CourseService.deleteEduItem(id, eduId)
      .then(() => getEduProgramCourse(eduId))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
        sx={{ marginBottom: "15px" }}
      >
        <Stack>
          <Typography variant="h4">Chương Trình Đào Tạo</Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          sx={{ borderRadius: "10px", backgroundColor: "#4caf50" }}
        >
          Thêm môn học
        </Button>
      </Stack>
      <ListEducationProgramCourse
        eduId={eduId}
        listCourse={listCourse}
        handleDelete={handleDelete}
      />
    </>
  );
}
