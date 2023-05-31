import { useForm } from "react-hook-form";
import SearchCourse from "..";
interface IProps {
  handleSearch: Function;
  handleReset: Function;
}

SearchCourseForm.defaultProps = {
  handleSearch: null,
  handleReset: null,
};

export default function SearchCourseForm({
  handleSearch,
  handleReset,
}: IProps) {
  const { register, handleSubmit, reset } = useForm({});

  const onSubmit = (data: SearchCourse) => {
    handleSearch(data.code?.trim() || data.name?.trim());
    console.log(data);
  };

  const resetForm = () => {
    handleReset();
    reset({
      code: "",
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
                <label className="form-label">Mã Học Phần</label>
                <input
                  {...register("code")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-sm-6 col-6">
              <div className="mb-1">
                <label className="form-label">Tên Học Phần</label>
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
