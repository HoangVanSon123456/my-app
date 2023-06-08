import { useState } from "react";
import { Edit, Trash } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import SectionClass from "types/SectionClass";

interface IProps {
  sectionClassList: SectionClass[];
  handleDelete: Function;
}

ListSectionClass.defaultProps = {
  sectionClassList: [],
  handleDelete: null,
};
export default function ListSectionClass({
  sectionClassList,
  handleDelete,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/lophocphan/update/${id}`);
  };
  return (
    <>
      <table className="datatables-basic table">
        <thead>
          <tr>
            <th className="text-left">STT</th>
            <th className="text-left">Lớp học phần</th>
            <th className="text-left">Giáo viên</th>
            <th className="text-left">Chương trình đào tạo</th>
            <th className="text-left">Học Kì</th>
            <th className="text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sectionClassList.map((item: SectionClass, index: number) => (
            <tr key={item.id}>
              <td className="text-left">{index + 1}</td>
              <td className="text-left">
                <Link to={`/lophocphan/getStudent/${item.id}`}>
                  <span className="fw-bold">{item?.name}</span>
                </Link>
              </td>
              <td className="text-left">{item?.userName}</td>
              <td className="text-left">{item?.educationProgramName}</td>
              <td className="text-left">{item?.semester}</td>
              <td>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(item.id!)}
                  >
                    <Trash size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-info btn-sm mx-1"
                    onClick={() => handleEditItem(item.id!)}
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
