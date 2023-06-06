import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import classNames from "classnames";
import { Eye, EyeOff } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import User from "types/User";
import { HttpStatusCode } from "axios";
import { setLocalStorage } from "configs/localStorage";
import { AUTH_KEYS } from "configs/auth";

export default function LoginFrom() {
  const [showPass, setShowPass] = useState(false);
  const navigator = useNavigate();
  const validateLogin = Yup.object({
    email: Yup.string().required("Please Enter your email"),
    // password: Yup.string()
    //   .required("Please Enter your password")
    //   .matches(
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    //     "Must Contain 6 Characters, One Uppercase, One Lowercase and One Number"
    //   ),
    password: Yup.string().required("Please Enter your password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateLogin),
  });

  const submitLogin = async (data: User) => {
    await AuthService.login(data.email!, data.password!).then((res) => {
      if (HttpStatusCode.Ok === 200) {
        setLocalStorage(AUTH_KEYS.ACCESS_TOKEN, res.data.accessToken || "");
        navigator("/trangchu");
      }
    });
  };

  return (
    <>
      <form
        className="auth-login-form mt-2"
        onSubmit={handleSubmit(submitLogin)}
      >
        <div className="mb-1">
          <label className="form-label">Email</label>
          <input
            {...register("email")}
            className={classNames("form-control")}
            type="text"
            placeholder="Email"
            tabIndex={1}
          />
          <span className="error">{errors?.email?.message?.toString()}</span>
        </div>
        <div className="mb-1">
          <div className="d-flex justify-content-between">
            <label className="form-label">Password</label>
            <Link to="/forgot">
              <small>Forgot Password?</small>
            </Link>
          </div>
          <div className="input-group input-group-merge form-password-toggle">
            <input
              {...register("password")}
              className={classNames("form-control")}
              type={showPass ? "text" : "password"}
              placeholder="············"
              tabIndex={2}
            />
            <span
              className="input-group-text cursor-pointer"
              onClick={() => setShowPass((prevShowPass) => !prevShowPass)}
            >
              {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
            </span>
          </div>
          <span className="error">{errors?.password?.message?.toString()}</span>
        </div>
        <div className="mb-1">
          <div className="form-check">
            <input
              className="form-check-input"
              id="remember-me"
              type="checkbox"
              tabIndex={3}
              {...register("isRemember")}
            />
            <label className="form-check-label" htmlFor="remember-me">
              {" "}
              Remember Me
            </label>
          </div>
        </div>
        <button className="btn btn-success w-100">Submit</button>
      </form>
    </>
  );
}
