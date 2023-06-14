import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import User from "types/User";
import * as yup from "yup";

const schema = yup
  .object({
    password: yup.string().required(""),
    newPassword: yup.string().required(""),
  })
  .required();

export default function ForgotForm() {
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Partial<User>>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: Partial<User>) => {
    // const results = await UserService.forgotPassword(data.email!);
    // showToast(results.success, results.messages);
    // if (results.success) {
    //   navigate("/login");
    // }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <form className="auth-login-form mt-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="">
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
            placeholder="Mật Khẩu"
            tabIndex={1}
          />
          <span
            className="input-group-text cursor-pointer"
            onClick={() => setShowPass((prevShowPass) => !prevShowPass)}
          >
            {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
          </span>
        </div>
      </div>
      <div className="mt-1">
        <label className="form-label">Mật khẩu mới</label>
        <div className="input-group">
          <input
            {...register("newPassword")}
            className={classNames("form-control", "form-control-merge", {
              error: Boolean(errors.newPassword?.message),
            })}
            type={showNewPass ? "text" : "password"}
            placeholder="Mật khẩu mới"
            tabIndex={2}
          />
          <span
            className="input-group-text cursor-pointer"
            onClick={() =>
              setShowNewPass((prevShowNewPass) => !prevShowNewPass)
            }
          >
            {showNewPass ? <EyeOff size={14} /> : <Eye size={14} />}
          </span>
        </div>
      </div>
      <div className="text-end mt-1">
        <button
          type="button"
          className="btn btn-secondary mx-1"
          onClick={handleBack}
        >
          Đăng nhập
        </button>
        <button type="button" className="btn btn-success">
          Đồng ý
        </button>
      </div>
    </form>
  );
}
