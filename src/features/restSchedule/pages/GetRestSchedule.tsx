import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import restScheduleService from "services/RestScheduleService";
import * as Yup from "yup";
export default function GetRestSchedule() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter your username"),
    testDay: Yup.string().required("Please Enter your username"),
    poetry: Yup.string().required("Please Enter your username"),
    examTime: Yup.string().required("Please Enter your username"),
    identificatioNumber: Yup.string().required("Please Enter your username"),
    examinationRoom: Yup.string().required("Please Enter your username"),
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
    if (id) {
      getRestSchedule(+id);
    }
  }, []);

  const getRestSchedule = (id: number) => {
    restScheduleService.getById(+id).then((restSchedule) => {
      const fields = [
        "userName",
        "courseName",
        "name",
        "testDay",
        "poetry",
        "examTime",
        "identificatioNumber",
        "examinationRoom",
        "id",
      ];
      fields.forEach((field) => setValue(field, restSchedule[field]));
    });
  };
  const handleBack = () => {
    navigate("/lichthi");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Lịch thi</div>
        <form className="row p-2 g-2">
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Tên sinh viên
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.userName?.message),
              })}
              {...register("userName")}
              readOnly
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Tên học phần
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.courseName?.message),
              })}
              {...register("courseName")}
              readOnly
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Tên đợt thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.name?.message),
              })}
              {...register("name")}
              readOnly
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Ngày thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.testDay?.message),
              })}
              {...register("testDay")}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="roles" className="form-label d-block text-start">
              Ca thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.poetry?.message),
              })}
              {...register("poetry")}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="roles" className="form-label d-block text-start">
              Giờ thi thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.examTime?.message),
              })}
              {...register("examTime")}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="roles" className="form-label d-block text-start">
              Số báo danh
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.identificatioNumber?.message),
              })}
              {...register("identificatioNumber")}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="roles" className="form-label d-block text-start">
              Phòng thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.examinationRoom?.message),
              })}
              {...register("examinationRoom")}
              readOnly
            />
          </div>
          <div className="col-12 text-end">
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
