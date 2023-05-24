import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "services/CourseService";
import Course from "types/Course";
import * as Yup from "yup";

export default function SuaCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter your name"),
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

  const getCourse = (id: number) => {
    CourseService.getById(+id).then((course) => {
      const fields = ["name", "id"];
      fields.forEach((field) => setValue(field, course[field]));
    });
  };

  useEffect(() => {
    if (id) {
      getCourse(+id);
    }
  }, []);

  const UpdateCourse = async (data: Course) => {
    if (id) {
      await CourseService.update(+id, data)
        .then((response) => {
          console.log(response);
          navigate("/course");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleBack = () => {
    navigate("/course");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Sửa Học Phần</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(UpdateCourse)}
          onReset={reset}
        >
          <div className="col-md-12">
            <label htmlFor="title" className="form-label d-block text-start">
              Tên Học Phần
            </label>
            <input
              type="text"
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
