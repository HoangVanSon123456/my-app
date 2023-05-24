import { useForm } from "react-hook-form";

export default function SearchGiaoVien() {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {};
  return (
    <div className="card">
      <div className="card-header mb-1">
        <h4 className="card-title">Tìm kiếm</h4>
      </div>
      <div className="card-body">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-sm-2 col-6">
              <div className="mb-1">
                <label className="form-label">Mã Sinh Viên</label>
                <input
                  {...register("searchText")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="mb-1">
                <label className="form-label">Họ và tên</label>
                <input
                  {...register("searchText")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-2 col-6">
              <div className="mb-1">
                <label className="form-label">Địa chỉ</label>
                <input
                  {...register("searchText")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="mb-1">
                <label className="form-label">Email</label>
                <input
                  {...register("searchText")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-2 col-6">
              <div className="mb-1">
                <label className="form-label">Số Điện Thoại</label>
                <input
                  {...register("searchText")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            {/* <div className="col-sm-2 col-6">
              <div className="mb-1">
                <label className="form-label">Tên</label>
                <input
                  {...register("searchText")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div> */}
            <div className="col-12 text-end">
              <button className="btn btn-outline-secondary waves-effect me-2">
                Reset
              </button>
              <button className="btn btn-success">Tìm kiếm</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
