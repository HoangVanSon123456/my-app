import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Course from "types/Course";
import { Edit, Trash } from "react-feather";

interface IProps {
  listCourse: Course[];
  handleDelete: Function;
}

ListCourse.defaultProps = {
  listCourse: [],
  handleDelete: null,
};

export default function ListCourse({ listCourse, handleDelete }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/hocphan/update/${id}`);
    console.log(id);
  };

  return (
    <>
      <section id="basic-datatable">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <table className="datatables-basic table">
                <thead>
                  <tr>
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
                            onClick={() => handleDelete(course.id!)}
                          >
                            <Trash size={16} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-info btn-sm mx-1"
                            onClick={() => handleEditItem(course.id!)}
                          >
                            <Edit size={16} />
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
