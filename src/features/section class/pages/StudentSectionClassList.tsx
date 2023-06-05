import { convertToSelectOptionsUser } from "components/common/common";
import { map } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";
import UserService from "services/UserService";
import StudentSectionClass from "types/StudentSectionClass";
import { SelectOption } from "types/common/Item";

export default function StudentSectionClassList() {
  const navigator = useNavigate();
  const [listStudent, setListStudent] = useState([]);
  const { handleSubmit, reset, setValue } = useForm({});
  const [selected, setSelected] = useState<SelectOption[]>([]);
  console.log(selected);

  const handleBack = () => {
    navigator(-1);
  };

  const saveOrUpdateUser = async (data: StudentSectionClass) => {
    console.log(data);
    await UserService.createStudentBySectionClass(data)
      .then((res) => {
        console.log(res);
        navigator(-1);
      })
      .catch((err) => console.log(err));
  };

  const onchangeSelect = (option: SelectOption[]) => {
    setSelected([...option]);
    setValue("userId", map(option, "value"));
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    await UserService.getListStrudent()
      .then((res) => {
        setListStudent(res);
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
            options={convertToSelectOptionsUser(listStudent)}
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
