import { Trash } from "react-feather";
import Course from "types/Course";
import { number } from "yup";

interface IProps {
  eduId: string;
  listCourse: Course[];
  handleDelete: Function;
}

ListEducationProgramCourse.defaultProps = {
  eduId: number,
  listCourse: [],
  handleDelete: null,
};
export default function ListEducationProgramCourse({
  listCourse,
  handleDelete,
  eduId,
}: IProps) {
  return (
    <>
      <section id="basic-datatable">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <table className="datatables-basic table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Mã học phần</th>
                    <th>Tên học phần</th>
                    <th>Số tín chỉ</th>
                    <th>Lớp lý thuyết</th>
                    <th>Lớp thực hành</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {listCourse.map((course: Course, index: number) => (
                    <tr key={course.id}>
                      <td>{index + 1}</td>
                      <td>{course.code}</td>
                      <td>{course.name}</td>
                      <td>{course.creditName}</td>
                      <td>{course.theoryClass}</td>
                      <td>{course.practicalClass}</td>
                      <td className="text-left">
                        <div>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(course.id!, eduId)}
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
