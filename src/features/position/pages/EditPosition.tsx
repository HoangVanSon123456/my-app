import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Subject from "types/Subject";
import SubjectService from "services/SubjectService";
import { useEffect } from "react";
import positionService from "services/PositionService";

export default function EditPosition() {
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
      getPosition(+id);
    }
  }, []);

  const getPosition = (id: number) => {
    positionService.getById(+id).then((position) => {
      const fields = ["name", "id"];
      fields.forEach((field) => setValue(field, position[field]));
    });
  };

  const updatePosition = async (data: Subject) => {
    if (id) {
      await positionService
        .update(+id, data)
        .then((response) => {
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleBack = () => {
    navigate(`/chucdanh`);
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Sửa chức danh</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(updatePosition)}
          onReset={reset}
        >
          <div className="col-md-12">
            <label htmlFor="content" className="form-label d-block text-start">
              Tên chức danh
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
