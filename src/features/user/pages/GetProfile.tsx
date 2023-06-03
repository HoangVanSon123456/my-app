import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "services/UserService";

export default function GetProfile() {
  const { register, setValue } = useForm();
  const { id } = useParams();

  const getUser = (id: number) => {
    UserService.getUser(+id).then((user) => {
      const fields = [
        "name",
        "useName",
        "email",
        "address",
        "age",
        "phone",
        "id",
      ];
      fields.forEach((field) => setValue(field, user[field]));
    });
  };

  useEffect(() => {
    if (id) {
      getUser(+id);
    }
  }, [id]);
  return (
    <>
      <div className="container rounded bg-white ">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
            </div>
          </div>
          <div className="col-md-9 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-right">Thông tin cá nhân</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("name")}
                    readOnly
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Học và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("useName")}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("phone")}
                    readOnly
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Địa chỉ</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("address")}
                    readOnly
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("email")}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
