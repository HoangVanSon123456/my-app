import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import User from "types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import UserService from "services/UserService";
import Academic from "types/Academic";
import AcademicService from "services/AcademicService";
import classNames from "classnames";

export default function EditAcademic() {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    userId: Yup.string().required("Please Enter your name"),
    year: Yup.string().required("Please Enter your username"),
    punishmentLevel: Yup.string().required("Please Enter your username"),
  }).required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { id } = useParams();
  useEffect(() => {
    getListUsers();
  }, []);

  useEffect(() => {
    if (id) {
      getAcademic(+id);
    }
  }, []);

  const getAcademic = (id: number) => {
    AcademicService.getById(+id).then((academic) => {
      const fields = ["userId", "year", "punishmentLevel", "id"];
      fields.forEach((field) => setValue(field, academic[field]));
    });
  };

  const getListUsers = async () => {
    await UserService.getListStrudent()
      .then((res) => {
        setListUsers(res);
      })
      .catch((err) => console.log(err));
  };

  const editAcademic = (data: Academic) => {
    if (id) {
      AcademicService.update(+id, data)
        .then((response) => {
          console.log(response);
          navigate("/hocvu");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleBack = () => {
    navigate("/hocvu");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Sửa học vụ</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(editAcademic)}
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
              Năm
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.year?.message),
              })}
              {...register("year")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="roles" className="form-label d-block text-start">
              Mức độ trừng phạt
            </label>
            <select
              {...register("punishmentLevel")}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="Cảnh báo mức 1">Cảnh báo mức 1</option>
              <option value="Cảnh báo mức 2">Cảnh báo mức 2</option>
              <option value="Cảnh báo mức 3">Cảnh báo mức 3</option>
              <option value="Thôi học">Thôi học</option>
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
    </>
  );
}
