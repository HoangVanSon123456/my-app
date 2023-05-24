import { useForm } from "react-hook-form";

export default function SearchNotification() {
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
            <div className="col-sm-3 col-6">
              <div className="mb-1">
                <label className="form-label">Mã Thông Báo</label>
                <input
                  {...register("searchText")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-9 col-6">
              <div className="mb-1">
                <label className="form-label">Tiêu đề</label>
                <input
                  {...register("searchText")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

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
