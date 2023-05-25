import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import classNames from "classnames";
import Notification from "types/Notification";
import NotificationService from "services/NotificationService";

export default function ThemNotification() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    title: Yup.string().required("Please Enter your name"),
    content: Yup.string().required("Please Enter your username"),
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
    NotificationService.create(data)
      .then((response) => {
        console.log(response);
        navigate("/ThongBao");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate("/ThongBao");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm thông báo</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveOrUpdateUser)}
          onReset={reset}
        >
          <div className="col-md-3">
            <label htmlFor="title" className="form-label d-block text-start">
              Tiêu đề
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.title?.message),
              })}
              {...register("title")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="title" className="form-label d-block text-start">
              Người tạo
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.userNotificationName?.message),
              })}
              {...register("userNotificationName")}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">File</label>
            <input
              {...register("files")}
              // type="file"
              type="text"
              className={classNames("form-control")}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="content" className="form-label d-block text-start">
              Nội dung
            </label>
            <textarea
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.content?.message),
              })}
              {...register("content")}
              style={{ height: "350px" }}
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
