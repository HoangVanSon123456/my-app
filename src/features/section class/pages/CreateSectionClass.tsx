import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import SectionClass from "types/SectionClass";
import SectionClassService from "services/SectionClassService";
import classNames from "classnames";
import EducationProgram from "types/EducationProgram";
import { useEffect, useState } from "react";
import EducationProgramService from "services/EducationProgramService";
import User from "types/User";
import UserService from "services/UserService";
export default function CreateSectionCLass() {
  const [listEducationProgram, setEducationProgramList] = useState<
    EducationProgram[]
  >([]);
  const [listUsers, setListUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter your name"),
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
    getList();
  }, []);

  const getList = async () => {
    await EducationProgramService.getList()
      .then((res) => {
        setEducationProgramList(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getListUsers();
  }, []);

  const getListUsers = async () => {
    await UserService.getListTeacherClass()
      .then((res) => {
        setListUsers(res);
      })
      .catch((err) => console.log(err));
  };

  const saveSectionClass = (data: SectionClass) => {
    SectionClassService.create(data)
      .then(() => {
        navigate("/lophocphan");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate("/lophocphan");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm lớp học phần</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveSectionClass)}
          onReset={reset}
        >
          <div className="col-md-6">
            <label htmlFor="title" className="form-label d-block text-start">
              Tên lớp học phần
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
          <div className="col-md-6">
            <label htmlFor="content" className="form-label d-block text-start">
              Chương trình đào tạo
            </label>
            <select {...register("educationProgramId")} className="form-select">
              <option value={0}>--</option>
              {listEducationProgram.map((la) => (
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
