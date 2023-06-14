import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import NotificationService from "services/NotificationService";
import StudyScoreService from "services/StudyScoreService";
import Notification from "types/Notification";
import StudyScore from "types/StudyScore";
import * as Yup from "yup";

export default function SuaStudyScore() {
  const navigate = useNavigate();
  const { id } = useParams();
  const validationSchema = Yup.object({
    studyTimes: Yup.string().required("Please Enter your username"),
    processPoint: Yup.string().required("Please Enter your username"),
    testScore: Yup.string().required("Please Enter your name"),
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

  const getStudyScore = (id: number) => {
    StudyScoreService.getById(+id).then((studyscore) => {
      const fields = ["studyTimes", "processPoint", "testScore", "id"];
      fields.forEach((field) => setValue(field, studyscore[field]));
    });
  };

  useEffect(() => {
    if (id) {
      getStudyScore(+id);
    }
  }, []);

  const UpdateStudyScore = async (data: StudyScore) => {
    if (id) {
      await StudyScoreService.update(+id, data)
        .then((response) => {
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleBack = () => {
    navigate("/diemhocphan");
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Sửa điểm</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(UpdateStudyScore)}
          onReset={reset}
        >
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Số lần học
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.studyTimes?.message),
              })}
              {...register("studyTimes")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Điểm quá trình
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.processPoint?.message),
              })}
              {...register("processPoint")}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Điểm thi
            </label>
            <input
              className={classNames("form-control", {
                "is-invalid": Boolean(errors?.testScore?.message),
              })}
              {...register("testScore")}
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
