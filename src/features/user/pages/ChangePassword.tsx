import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserService from "services/UserService";
import User from "types/User";
import * as Yup from "yup";

export default function ChangePassword() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    password: Yup.string().required("Please Enter your name"),
    newPassword: Yup.string().required("Please Enter your username"),
  }).required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleChangePassword = async (data: User) => {
    await UserService.changePassword(data)
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Đổi mật khẩu</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(handleChangePassword)}
          onReset={reset}
        >
          <div className="col-md-6">
            <label htmlFor="name" className="form-label d-block text-start">
              Mật khẩu
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.password?.message),
              })}
              {...register("password")}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label d-block text-start">
              Mật khẩu mới
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.newPassword?.message),
              })}
              {...register("newPassword")}
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
