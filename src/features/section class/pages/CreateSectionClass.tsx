import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import SectionClass from "types/SectionClass";
import SectionClassService from "services/SectionClassService";
import classNames from "classnames";
export default function CreateSectionCLass() {
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

  const saveSectionClass = (data: SectionClass) => {
    SectionClassService.create(data)
      .then(() => {
        navigate("/lophocphan");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    navigate("/lophocphan");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm lớp học phần</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveSectionClass)}
          onReset={reset}
        >
          <div className="col-md-12">
            <label htmlFor="title" className="form-label d-block text-start">
              Tên lớp học phần
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
