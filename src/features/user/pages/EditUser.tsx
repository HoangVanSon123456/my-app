import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "services/UserService";
import classNames from "classnames";
import { Eye, EyeOff } from "react-feather";
import User from "types/User";
export default function SuaGiaoVien() {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const getUser = (id: number) => {
    UserService.getById(+id).then((user) => {
      const fields = [
        "name",
        "useName",
        "usePass",
        "email",
        "gender",
        "address",
        "age",
        "phone",
        "role",
        "id",
      ];
      fields.forEach((field) => setValue(field, user[field]));
    });
  };

  useEffect(() => {
    if (id) {
      getUser(+id);
    }
  }, []);

  const UpdateUser = async (data: User) => {
    if (id) {
      await UserService.update(+id, data)
        .then((response) => {
          console.log(response);
          navigate("/GiaoVien");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header h1">Sửa Giáo Viên</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(UpdateUser)}
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
            <label htmlFor="password" className="form-label d-block text-start">
              Mật Khẩu
            </label>
            <div className="input-group">
              <input
                {...register("usePass")}
                className={classNames("form-control", "form-control-merge", {
                  error: Boolean(errors.usePass?.message),
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
              Vai trò
            </label>
            <select
              {...register("role")}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div className="col-12 text-end">
            <button type="submit" className="btn btn-primary me-2">
              Lưu
            </button>
            <button type="submit" className="btn btn-secondary">
              Thoát
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
