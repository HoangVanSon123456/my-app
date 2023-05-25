import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import TuitionService from "services/TuitionService";
import Tuition from "types/Tuition";
import * as Yup from "yup";

export default function SuaTuition() {
  const navigate = useNavigate();
  const { id } = useParams();
  const validationSchema = Yup.object({
    tuitionType: Yup.string().required("Please Enter your name"),
    semester: Yup.string().required("Please Enter your username"),
    creditName: Yup.string().required("Please Enter your name"),
    price: Yup.string().required("Please Enter your username"),
    discount: Yup.string().required("Please Enter your name"),
    reLearn: Yup.string().required("Please Enter your username"),
    intoMoney: Yup.string().required("Please Enter your name"),
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

  const getTuition = (id: number) => {
    TuitionService.getById(+id).then((tuition) => {
      const fields = [
        "tuitionType",
        "semester",
        "creditName",
        "price",
        "discount",
        "reLearn",
        "intoMoney",
        "id",
      ];
      fields.forEach((field) => setValue(field, tuition[field]));
    });
  };

  useEffect(() => {
    if (id) {
      getTuition(+id);
    }
  }, []);

  const UpdateTuition = async (data: Tuition) => {
    if (id) {
      await TuitionService.update(+id, data)
        .then((response) => {
          console.log(response);
          navigate("/hocphi");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleBack = () => {
    navigate("/hocphi");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Sửa Học Phí</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(UpdateTuition)}
          onReset={reset}
        >
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
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Số tín chỉ
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.creditName?.message),
              })}
              {...register("creditName")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Số tiền
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.price?.message),
              })}
              {...register("price")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Miễn Giảm
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.discount?.message),
              })}
              {...register("discount")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="title" className="form-label d-block text-start">
              Học lại
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.reLearn?.message),
              })}
              {...register("reLearn")}
            />
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
