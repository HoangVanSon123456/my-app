import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import UserService from "services/UserService";
import classNames from "classnames";
import User from "types/User";
import CourseService from "services/CourseService";
import Course from "types/Course";
import RestSchedule from "types/RestSchedule";
import restScheduleService from "services/RestScheduleService";

export default function CreateRestSchedule() {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const [listCourse, setCourseList] = useState<Course[]>([]);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    userId: Yup.string().required("Please Enter your name"),
    courseId: Yup.string().required("Please Enter your username"),
    name: Yup.string().required("Please Enter your username"),
    testDay: Yup.string().required("Please Enter your username"),
    poetry: Yup.string().required("Please Enter your username"),
    examTime: Yup.string().required("Please Enter your username"),
    identificatioNumber: Yup.string().required("Please Enter your username"),
    examinationRoom: Yup.string().required("Please Enter your username"),
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
    getListUsers();
  }, []);

  const getListUsers = async () => {
    await UserService.getListStrudent()
      .then((res) => {
        setListUsers(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    await CourseService.getList()
      .then((res) => {
        setCourseList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const saveRestSchedule = (data: RestSchedule) => {
    restScheduleService
      .create(data)
      .then((response) => {
        console.log(response);
        navigate("/lichthi");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate("/lichthi");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm lịch thi</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveRestSchedule)}
          onReset={reset}
        >
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Tên sinh viên
            </label>
            <select {...register("userId")} className="form-select">
              <option value={0}>--</option>
              {listUsers.map((la) => (
                <option key={la.id} value={la.id}>
                  {la.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Tên học phần
            </label>
            <select {...register("courseId")} className="form-select">
              <option value={0}>--</option>
              {listCourse.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Tên đợt thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.name?.message),
              })}
              {...register("name")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Ngày thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.testDay?.message),
              })}
              {...register("testDay")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="roles" className="form-label d-block text-start">
              Ca thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.poetry?.message),
              })}
              {...register("poetry")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="roles" className="form-label d-block text-start">
              Giờ thi thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.examTime?.message),
              })}
              {...register("examTime")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="roles" className="form-label d-block text-start">
              Số báo danh
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.identificatioNumber?.message),
              })}
              {...register("identificatioNumber")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="roles" className="form-label d-block text-start">
              Phòng thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.examinationRoom?.message),
              })}
              {...register("examinationRoom")}
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
