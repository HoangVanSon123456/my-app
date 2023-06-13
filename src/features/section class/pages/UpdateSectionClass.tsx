import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import SectionClassService from "services/SectionClassService";
import UserService from "services/UserService";
import SectionClass from "types/SectionClass";
import User from "types/User";
import * as Yup from "yup";

export default function UpdateSectionCLass() {
  const [listUsers, setListUsers] = useState<User[]>([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter your name"),
    semester: Yup.string().required("Please Enter your name"),
    userId: Yup.string().required("Please Enter your name"),
  }).required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const getSectionClass = (id: number) => {
    SectionClassService.getById(+id).then((sectionClass) => {
      const fields = ["name", "semester", "userId", "id"];
      fields.forEach((field) => setValue(field, sectionClass[field]));
    });
  };

  useEffect(() => {
    if (id) {
      getSectionClass(+id);
    }
  }, []);

  const UpdateSectionClass = async (data: SectionClass) => {
    if (id) {
      await SectionClassService.update(+id, data)
        .then(() => {
          navigate("/lophocphan");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getListUsers();
  }, []);

  const getListUsers = async () => {
    await UserService.getListTeacher()
      .then((res) => {
        setListUsers(res);
      })
      .catch((err) => console.log(err));
  };

  const handleBack = () => {
    navigate("/lophocphan");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Sửa lớp học phần</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(UpdateSectionClass)}
          onReset={reset}
        >
          <div className="col-md-6">
            <label htmlFor="title" className="form-label d-block text-start">
              Lớp học phần
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.name?.message),
              })}
              {...register("name")}
            />
          </div>
          <div className="col-md-6">
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
          <div className="col-md-6">
            <label htmlFor="content" className="form-label d-block text-start">
              Giáo Viên
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
