import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import UserService from "services/UserService";
import User from "types/User";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";

export default function ThemGiaoVien() {
  const [showPass, setShowPass] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter your name"),
    useName: Yup.string().required("Please Enter your username"),
    email: Yup.string()
      .email("Email is invalid")
      .required("Please Enter your email"),
    // password: Yup.string()
    //   .required("Please Enter your password")
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    //     "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number"
    //   ),
  }).required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const saveOrUpdateUser = (data: User) => {
    setLoadingUpdate(true);
    UserService.create(data)
      .then((response) => {
        if (response.userPosition == "TEACHER") {
          navigate("/GiaoVien");
        } else {
          navigate("/SinhVien");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoadingUpdate(false);
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="card">
      <div className="card-header h2">Thêm</div>
      <form
        className="row p-2 g-2"
        onSubmit={handleSubmit(saveOrUpdateUser)}
        onReset={reset}
      >
        <div className="col-md-3">
          <label htmlFor="name" className="form-label d-block text-start">
            Tên
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": Boolean(errors?.name?.message),
            })}
            {...register("name")}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="useName" className="form-label d-block text-start">
            Họ và Tên
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": Boolean(errors?.useName?.message),
            })}
            {...register("useName")}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            Email <span className="error">*</span>
          </label>
          <input
            {...register("email")}
            type="text"
            className={classNames("form-control", {
              "is-invalid": Boolean(errors.email?.message),
            })}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="usePass" className="form-label d-block text-start">
            Mật Khẩu
          </label>
          <div className="input-group">
            <input
              {...register("password")}
              className={classNames("form-control", "form-control-merge", {
                error: Boolean(errors.password?.message),
              })}
              type={showPass ? "text" : "password"}
              tabIndex={2}
            />
            <span
              className="input-group-text cursor-pointer"
              onClick={() => setShowPass((prevShowPass) => !prevShowPass)}
            >
              {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
            </span>
          </div>
        </div>

        <div className="col-md-3">
          <label htmlFor="phone" className="form-label d-block text-start">
            Số Điện Thoại
          </label>
          <input
            type="phone"
            className={classNames("form-control", {
              "is-invalid": Boolean(errors?.phone?.message),
            })}
            {...register("phone")}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="address" className="form-label d-block text-start">
            Địa chỉ
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": Boolean(errors?.address?.message),
            })}
            {...register("address")}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="age" className="form-label d-block text-start">
            Tuổi
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": Boolean(errors?.age?.message),
            })}
            {...register("age")}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="roles" className="form-label d-block text-start">
            Giới tính
          </label>
          <select
            {...register("gender")}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="roles" className="form-label d-block text-start">
            Chức vụ
          </label>
          <select
            {...register("userPosition")}
            className="form-select"
            aria-label="Default select example"
          >
            <option value="TEACHER">Giáo Viên</option>
            <option value="STUDENT">Sinh viên</option>
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
  );
}
