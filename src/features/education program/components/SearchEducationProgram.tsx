import { useForm } from "react-hook-form";

export default function SearchEducationProgram() {
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
            <div className="col-sm-6 col-6">
              <div className="mb-1">
                <label className="form-label">Mã Học Phần</label>
                <input
                  {...register("searchText")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-6 col-6">
              <div className="mb-1">
                <label className="form-label">Tên Học Phần</label>
                <input
                  {...register("searchText")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-12 text-end">
              <button className="btn btn-outline-secondary waves-effect me-2">
                Đặt lại
              </button>
              <button className="btn btn-success">Tìm kiếm</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
