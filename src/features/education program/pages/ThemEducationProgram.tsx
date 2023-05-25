import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import classNames from "classnames";
import Notification from "types/Notification";
import NotificationService from "services/NotificationService";
import EducationProgramService from "services/EducationProgramService";

export default function ThemEducationProgram() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    courseCode: Yup.string().required("Please Enter your name"),
    courseName: Yup.string().required("Please Enter your username"),
    creditName: Yup.string().required("Please Enter your username"),
    theoryClass: Yup.string().required("Please Enter your username"),
    practicalClass: Yup.string().required("Please Enter your username"),
    semester: Yup.string().required("Please Enter your username"),
  }).required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const saveOrUpdateUser = (data: Notification) => {
    EducationProgramService.create(data)
      .then((response) => {
        console.log(response);
        navigate("/chuongtrinhdaotao");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate("/chuongtrinhdaotao");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm Chương Trình Đào Tạo</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveOrUpdateUser)}
          onReset={reset}
        >
          <div className="col-md-3">
            <label htmlFor="title" className="form-label d-block text-start">
              Mã học phần
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.courseCode?.message),
              })}
              {...register("courseCode")}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Tên học phần</label>
            <input
              {...register("courseName")}
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.courseName?.message),
              })}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="content" className="form-label d-block text-start">
              Số Tín Chỉ
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.creditName?.message),
              })}
              {...register("creditName")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="content" className="form-label d-block text-start">
              Số Tiết Lý Thuyết
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.theoryClass?.message),
              })}
              {...register("theoryClass")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="content" className="form-label d-block text-start">
              Số Tiết Thực Hành
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.practicalClass?.message),
              })}
              {...register("practicalClass")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="content" className="form-label d-block text-start">
              Học Kỳ
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.semester?.message),
              })}
              {...register("semester")}
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
