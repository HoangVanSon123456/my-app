import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import classNames from "classnames";
import Tuition from "types/Tuition";
import TuitionService from "services/TuitionService";
import { useEffect, useState } from "react";
import UserService from "services/UserService";
import User from "types/User";

export default function ThemTuition() {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    tuitionType: Yup.string().required("Please Enter your name"),
    semester: Yup.string().required("Please Enter your username"),
    status: Yup.string().required("Please Enter your username"),
    userId: Yup.string().required("Please Enter your name"),
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

  const saveOrUpdateUser = (data: Tuition) => {
    TuitionService.create(data)
      .then((response) => {
        console.log(response);
        navigate("/hocphi");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate("/hocphi");
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
            <label htmlFor="title" className="form-label d-block text-start">
              Loại học phí
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.tuitionType?.message),
              })}
              {...register("tuitionType")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Học kỳ
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.semester?.message),
              })}
              {...register("semester")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="roles" className="form-label d-block text-start">
              Trạng thái
            </label>
            <select
              {...register("status")}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="Chưa đóng học phí">Chưa đóng học phí</option>
              <option value="Đã đóng học phí">Đã đóng học phí</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Thành tiền
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.intoMoney?.message),
              })}
              {...register("intoMoney")}
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
