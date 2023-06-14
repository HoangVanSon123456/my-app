import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import EducationProgramService from "services/EducationProgramService";
import EducationProgram from "types/EducationProgram";

import * as Yup from "yup";

export default function SuaEducationProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter your username"),
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

  const getEducationProduct = (id: number) => {
    EducationProgramService.getById(+id).then((EducationProduct) => {
      const fields = ["name", "id"];
      fields.forEach((field) => setValue(field, EducationProduct[field]));
    });
  };

  useEffect(() => {
    if (id) {
      getEducationProduct(+id);
    }
  }, []);

  const UpdateEducationProduct = async (data: EducationProgram) => {
    if (id) {
      await EducationProgramService.update(+id, data)
        .then((response) => {
          navigate("/chuongtrinhdaotao");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleBack = () => {
    navigate("/chuongtrinhdaotao");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm thông báo</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(UpdateEducationProduct)}
          onReset={reset}
        >
          <div className="col-md-12">
            <label className="form-label">Tên học phần</label>
            <input
              {...register("name")}
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.name?.message),
              })}
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
