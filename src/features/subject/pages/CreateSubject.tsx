import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Subject from "types/Subject";
import SubjectService from "services/SubjectService";

export default function CreateSubject() {
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

  const saveStudyScore = (data: Subject) => {
    SubjectService.create(data)
      .then((response) => {
        console.log(response);
        navigate(`/bomon`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate(`/bomon`);
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm bộ môn</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveStudyScore)}
          onReset={reset}
        >
          <div className="col-md-12">
            <label htmlFor="content" className="form-label d-block text-start">
              Tên bộ môn
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.name?.message),
              })}
              {...register("name")}
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
