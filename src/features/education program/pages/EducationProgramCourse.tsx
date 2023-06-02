import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Trash } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import courseService from "services/CourseService";
import EducationProgramService from "services/EducationProgramService";
import Course from "types/Course";

export default function EducationProgramCourse() {
  const [listCourse, setCoulistCourseList] = useState<Course[]>([]);
  const { eduId } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (eduId) {
      console.log(eduId);
      getEduProgramCourse(+eduId);
    }
  }, [eduId]);

  const getEduProgramCourse = async (eduId: number) => {
    await courseService
      .getCourseByEdu(eduId)
      .then((res) => {
        console.log(res);
        setCoulistCourseList(res);
        localStorage.setItem("eduId", String(eduId));
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id: number) => {
    await courseService
      .deleteItem(id)
      .then(() => getEduProgramCourse(id))
      .catch((err) => console.log(err));
  };

  const handleClickOpen = async () => {
    navigator("/chuongtrinhdaotao/createCourse");
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
      {/* <SearchEducationProgram /> */}
      <section id="basic-datatable">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <table className="datatables-basic table">
                <thead>
                  <tr>
                    <th>Mã học phần</th>
                    <th>Tên học phần</th>
                    <th>Số tín chỉ</th>
                    <th>Lớp lý thuyết</th>
                    <th>Lớp thực hành</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {listCourse.map((course: Course, index: number) => (
                    <tr key={course.id}>
                      <td>{course.code}</td>
                      <td>{course.name}</td>
                      <td>{course.creditName}</td>
                      <td>{course.theoryClass}</td>
                      <td>{course.practicalClass}</td>
                      <td className="text-left">
                        <div>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(course.id!)}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
