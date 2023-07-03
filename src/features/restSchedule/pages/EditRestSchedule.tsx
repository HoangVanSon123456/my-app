import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Academic from "types/Academic";
import classNames from "classnames";
import restScheduleService from "services/RestScheduleService";

export default function EditRestSchedule() {
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

  const EditRestSchedule = (data: Academic) => {
    if (id) {
      restScheduleService
        .update(+id, data)
        .then((response) => {
          console.log(response);
          navigate("/lichthi");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleBack = () => {
    navigate("/lichthi");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Sửa lịch thi</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(EditRestSchedule)}
          onReset={reset}
        >
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
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="roles" className="form-label d-block text-start">
              Ca thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.poetry?.message),
              })}
              {...register("poetry")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="roles" className="form-label d-block text-start">
              Giờ thi thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.examTime?.message),
              })}
              {...register("examTime")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="roles" className="form-label d-block text-start">
              Số báo danh
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.identificatioNumber?.message),
              })}
              {...register("identificatioNumber")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="roles" className="form-label d-block text-start">
              Phòng thi
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.examinationRoom?.message),
              })}
              {...register("examinationRoom")}
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
