import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import classNames from "classnames";
import Notification from "types/Notification";
import CourseService from "services/CourseService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HttpStatusCode } from "axios";
import Course from "types/Course";

export default function ThemCourse() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter your name"),
  }).required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const saveCourse = (data: Course) => {
    CourseService.create(data)
      .then(() => {
        if (HttpStatusCode.Ok == 200) {
          toast.success("Thanh cong");
          navigate("/hocphan");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate("/hocphan");
  };

  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm Học Phần</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveCourse)}
          onReset={reset}
        >
          <div className="col-md-6">
            <label htmlFor="title" className="form-label d-block text-start">
              Mã học phần
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.code?.message),
              })}
              {...register("code")}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="title" className="form-label d-block text-start">
              Tên học phần
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
              Số tín chỉ
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.creditName?.message),
              })}
              {...register("creditName")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Lớp lý thuyết
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.theoryClass?.message),
              })}
              {...register("theoryClass")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Lớp thực hành
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.practicalClass?.message),
              })}
              {...register("practicalClass")}
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
      <ToastContainer autoClose={2000} />
    </>
  );
}
