import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import classNames from "classnames";
import StudyScore from "types/StudyScore";
import StudyScoreService from "services/StudyScoreService";
import { useEffect, useState } from "react";
import Course from "types/Course";
import CourseService from "services/CourseService";

export default function ThemStudyScore() {
  const [listCourse, setCoulistCourseList] = useState<Course[]>([]);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    courseId: Yup.string().required("Please Enter your name"),
    evaluate: Yup.string().required("Please Enter your username"),
    studyTimes: Yup.string().required("Please Enter your username"),
    processPoint: Yup.string().required("Please Enter your username"),
    testScore: Yup.string().required("Please Enter your username"),
    endPoint: Yup.string().required("Please Enter your username"),
    letterPoint: Yup.string().required("Please Enter your username"),
  }).required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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

  const saveStudyScore = (data: StudyScore) => {
    StudyScoreService.create(data)
      .then((response) => {
        navigate("/diemhocphan");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate("/diemhocphan");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm Điểm</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveStudyScore)}
          onReset={reset}
        >
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Học phầns
            </label>
            <select {...register("courseId")} className="form-select">
              <option value={0}>--</option>
              {listCourse.map((la) => (
                <option key={la.id} value={la.id}>
                  {la.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Số lần học
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.studyTimes?.message),
              })}
              {...register("studyTimes")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Đánh giá
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.evaluate?.message),
              })}
              {...register("evaluate")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Điểm quá trình
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.processPoint?.message),
              })}
              {...register("processPoint")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Điểm thi
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.testScore?.message),
              })}
              {...register("testScore")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Tổng kết học phần
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.endPoint?.message),
              })}
              {...register("endPoint")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Điểm chữ
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.letterPoint?.message),
              })}
              {...register("letterPoint")}
            />
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
