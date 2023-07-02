import { useState } from "react";
import { Edit, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import Academic from "types/Academic";

interface IProps {
  listAcademic: Academic[];
  handleDelete: Function;
}

ListAcademic.defaultProps = {
  listAcademic: [],
  handleDelete: null,
};
export default function ListAcademic({ listAcademic, handleDelete }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/hocvu/update/${id}`);
  };

  return (
    <>
      <table className="datatables-basic table">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Mã sinh viên</th>
            <th className="text-center">Tên sinh viên</th>
            <th className="text-center">Năm</th>
            <th className="text-center">Mức độ trừng phạt</th>
            <th className="text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listAcademic.map((item: Academic, index: number) => (
            <tr key={item.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{item.userCode}</td>
              <td className="text-center">{item.userName}</td>
              <td className="text-center">{item.year}</td>
              <td className="text-center">{item.punishmentLevel}</td>
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
