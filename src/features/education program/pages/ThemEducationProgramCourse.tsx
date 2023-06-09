import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CourseService from "services/CourseService";
import EducationProgramService from "services/EducationProgramService";
import Course from "types/Course";
import EduProCourse from "types/EduProCourse";
import { MultiSelect } from "react-multi-select-component";
import { SelectOption } from "types/common/Item";
import { convertToSelectOptions } from "components/common/common";
import { map } from "lodash";

export default function ThemEducationProgramCourse() {
  const navigator = useNavigate();
  const [listCourse, setCoulistCourseList] = useState([]);
  const { register, handleSubmit, reset, setValue } = useForm({});
  const [selected, setSelected] = useState<SelectOption[]>([]);
  console.log(selected);
  const handleBack = () => {
    navigator(-1);
  };

  const saveOrUpdateUser = async (data: EduProCourse) => {
    console.log(data);
    await EducationProgramService.createCourseEdu(data)
      .then((res) => {
        console.log(res);
        navigator(-1);
      })
      .catch((err) => console.log(err));
  };

  const onchangeSelect = (option: SelectOption[]) => {
    setSelected([...option]);
    setValue("courseIds", map(option, "value"));
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    await CourseService.getList()
      .then((res) => {
        setCoulistCourseList(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="card">
        <div className="card-header h2">Thêm Môn Học Chương Trình Đào Tạo</div>
        <form
          className="row p-2 g-2"
          onSubmit={handleSubmit(saveOrUpdateUser)}
          onReset={reset}
        >
          <MultiSelect
            options={convertToSelectOptions(listCourse)}
            value={selected}
            onChange={onchangeSelect}
            labelledBy="Select"
          />
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
