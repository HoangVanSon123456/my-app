import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "services/UserService";

export default function UserDetailTeacher() {
  const { register, setValue } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getUser(+id);
    }
  }, [id]);

  const getUser = (id: number) => {
    UserService.getById(+id).then((user) => {
      const fields = [
        "name",
        "useName",
        "email",
        "address",
        "age",
        "phone",
        "position",
        "subject",
        "depict",
        "id",
      ];
      fields.forEach((field) => setValue(field, user[field]));
    });
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="container rounded bg-white ">
        <div className="row">
          <div className="col-md-12 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-right">Thông tin chi tiết</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="form-label">Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("name")}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Học và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("useName")}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("phone")}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("address")}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("email")}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label className="form-label">Chức vụ</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("position")}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label className="form-label">Bộ môn</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("subject")}
                    readOnly
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label className="form-label">Bộ môn</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("depict")}
                    readOnly
                  />
                </div>
                <div className="col-12 text-end mt-2 ms-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-10px me-1"
                    // onClick={handleClickOpen}
                  >
                    Thêm tài liệu
                  </button>

                  <button
                    type="submit"
                    className="btn btn-secondary me-2"
                    onClick={handleBack}
                  >
                    Thoát
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
