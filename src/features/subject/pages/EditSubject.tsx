import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Subject from "types/Subject";
import SubjectService from "services/SubjectService";
import { useEffect } from "react";

export default function EditSubject() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter your name"),
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
      getSubject(+id);
    }
  }, []);

  const getSubject = (id: number) => {
    SubjectService.getById(+id).then((subject) => {
      const fields = ["name", "id"];
      fields.forEach((field) => setValue(field, subject[field]));
    });
  };

  const updateSubject = async (data: Subject) => {
    if (id) {
      await SubjectService.update(+id, data)
        .then((response) => {
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleBack = () => {
    navigate(`/bomon`);
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Sửa bộ môn</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(updateSubject)}
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
