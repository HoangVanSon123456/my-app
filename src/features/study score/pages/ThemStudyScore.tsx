import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import classNames from "classnames";
import StudyScore from "types/StudyScore";
import StudyScoreService from "services/StudyScoreService";
import { useEffect, useState } from "react";
import UserService from "services/UserService";
import User from "types/User";

export default function ThemStudyScore() {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    userId: Yup.string().required("Please Enter your name"),
    studyTimes: Yup.string().required("Please Enter your username"),
    processPoint: Yup.string().required("Please Enter your username"),
    testScore: Yup.string().required("Please Enter your username"),
  }).required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    getListUsers();
  }, []);

  const getListUsers = async () => {
    await UserService.getListStrudent()
      .then((res) => {
        setListUsers(res);
      })
      .catch((err) => console.log(err));
  };

  const saveStudyScore = (data: StudyScore) => {
    StudyScoreService.createStudyScoreBySectionClass(data)
      .then((response) => {
        console.log(response);
        const result = localStorage.getItem("sectionScoreId");
        navigate(`/lophocphan/getStudent/${result}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    const result = localStorage.getItem("sectionScoreId");
    navigate(`/lophocphan/getStudent/${result}`);
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm Điểm</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveStudyScore)}
          onReset={reset}
        >
          <div className="col-md-4">
            <label htmlFor="content" className="form-label d-block text-start">
              Tên sinh viên
            </label>
            <select {...register("userId")} className="form-select">
              <option value={0}>--</option>
              {listUsers.map((la) => (
                <option key={la.id} value={la.id}>
                  {la.name}
                </option>
              ))}
            </select>
          </div>
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
