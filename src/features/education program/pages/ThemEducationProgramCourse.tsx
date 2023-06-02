import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CourseService from "services/CourseService";
import EducationProgramService from "services/EducationProgramService";
import Course from "types/Course";
import EduProCourse from "types/EduProCourse";

export default function ThemEducationProgramCourse() {
  const navigator = useNavigate();
  const [listCourse, setCoulistCourseList] = useState<Course[]>([]);
  const { register, handleSubmit, reset } = useForm({});

  const handleBack = () => {
    navigator(-1);
  };

  const saveOrUpdateUser = async (data: EduProCourse) => {
    await EducationProgramService.createCourseEdu(data)
      .then((res) => {
        console.log(res);
        navigator(-1);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    await CourseService.getList()
      .then((res) => {
        setCoulistCourseList(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm Môn Học Chương Trình Đào Tạo</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveOrUpdateUser)}
          onReset={reset}
        >
          <div className="col-md-12">
            <label htmlFor="title" className="form-label d-block text-start">
              Tên môn học
            </label>
            <select {...register("courseIds")} className="form-select">
              <option value={0}>--</option>
              {listCourse.map((la) => (
                <option key={la.id} value={la.id}>
                  {la.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary me-2">
              Lưu
            </button>
            <button
              type="submit"
              className="btn btn-secondary me-2"
              onClick={handleBack}
            >
              Thoát
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
