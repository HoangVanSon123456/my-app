import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "services/UserService";
import classNames from "classnames";
import User from "types/User";
import positionService from "services/PositionService";
import SubjectService from "services/SubjectService";
import Position from "types/Position";
import Subject from "types/Subject";
export default function EditTeacher() {
  const [listPosition, setPositionList] = useState<Position[]>([]);
  const [listSubject, setSubjectList] = useState<Subject[]>([]);
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
        "positionId",
        "userPosition",
        "subjectId",
        "depict",
        "id",
      ];
      fields.forEach((field) => setValue(field, user[field]));
    });
  };

  useEffect(() => {
    if (id) {
      getUser(+id);
    }
  }, [id]);

  const UpdateUser = async (data: User) => {
    if (id) {
      await UserService.updateTeacher(+id, data)
        .then(() => {
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getListPosition();
  }, []);

  const getListPosition = async () => {
    await positionService
      .getList()
      .then((res) => {
        setPositionList(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getListSubject();
  }, []);

  const getListSubject = async () => {
    await SubjectService.getList()
      .then((res) => {
        setSubjectList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="card">
        <div className="card-header h1">Sửa</div>
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
          <div className="col-md-4">
            <label htmlFor="age" className="form-label d-block text-start">
              Chức vụ
            </label>
            <select {...register("positionId")} className="form-select">
              <option value={0}>--</option>
              {listPosition.map((la) => (
                <option key={la.id} value={la.id}>
                  {la.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="age" className="form-label d-block text-start">
              Bộ môn
            </label>
            <select {...register("subjectId")} className="form-select">
              <option value={0}>--</option>
              {listSubject.map((la) => (
                <option key={la.id} value={la.id}>
                  {la.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="age" className="form-label d-block text-start">
              Mô tả
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.depict?.message),
              })}
              {...register("depict")}
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
              className="btn btn-secondary"
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
