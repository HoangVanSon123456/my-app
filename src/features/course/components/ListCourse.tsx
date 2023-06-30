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
  };

  return (
    <>
      <table className="datatables-basic table">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Mã học phần</th>
            <th className="text-center">Tên học phần</th>
            <th className="text-center">Số tín chỉ</th>
            <th className="text-center">Lớp lý thuyết</th>
            <th className="text-center">Lớp thực hành</th>
            <th className="text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listCourse.map((course: Course, index: number) => (
            <tr key={course.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{course.code}</td>
              <td className="text-center">{course.name}</td>
              <td className="text-center">{course.creditName}</td>
              <td className="text-center">{course.theoryClass}</td>
              <td className="text-center">{course.practicalClass}</td>
              <td>
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
    </>
  );
}
