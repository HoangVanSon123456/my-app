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
    courseCode: Yup.string().required("Please Enter your name"),
    courseName: Yup.string().required("Please Enter your username"),
    creditName: Yup.string().required("Please Enter your username"),
    theoryClass: Yup.string().required("Please Enter your username"),
    practicalClass: Yup.string().required("Please Enter your username"),
    semester: Yup.string().required("Please Enter your username"),
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
      const fields = [
        "courseCode",
        "courseName",
        "creditName",
        "theoryClass",
        "practicalClass",
        "semester",
        "id",
      ];
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
          console.log(response);
          navigate("/educationProgram");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleBack = () => {
    navigate("/educationProgram");
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
          <div className="col-md-3">
            <label htmlFor="title" className="form-label d-block text-start">
              Mã học phần
            </label>
            <input
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.courseCode?.message),
              })}
              {...register("courseCode")}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Tên học phần</label>
            <input
              {...register("courseName")}
              type="text"
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.courseName?.message),
              })}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="content" className="form-label d-block text-start">
              Số Tín Chỉ
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.creditName?.message),
              })}
              {...register("creditName")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="content" className="form-label d-block text-start">
              Số Tiết Lý Thuyết
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.theoryClass?.message),
              })}
              {...register("theoryClass")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="content" className="form-label d-block text-start">
              Số Tiết Thực Hành
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.practicalClass?.message),
              })}
              {...register("practicalClass")}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="content" className="form-label d-block text-start">
              Học Kỳ
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.semester?.message),
              })}
              {...register("semester")}
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
