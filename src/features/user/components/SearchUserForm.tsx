import { useForm } from "react-hook-form";
import SearchUser from "../types";

interface IProps {
  handleSearch: Function;
  handleReset: Function;
}

SearchGiaoVien.defaultProps = {
  handleSearch: null,
  handleReset: null,
};

export default function SearchGiaoVien({ handleSearch, handleReset }: IProps) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: SearchUser) => {
    handleSearch(data.id || data.name?.trim());
  };

  const resetForm = () => {
    handleReset();
    reset({
      id: "",
      name: "",
    });
  };

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
                <label className="form-label">Mã Sinh Viên</label>
                <input
                  {...register("id")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-6 col-6">
              <div className="mb-1">
                <label className="form-label">Họ và tên</label>
                <input
                  {...register("name")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            <div className="col-12 text-end">
              <button
                className="btn btn-outline-secondary waves-effect me-2"
                onClick={resetForm}
              >
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
