import { useState } from "react";
import { Edit, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import Subject from "types/Subject";

interface IProps {
  listSubject: Subject[];
  handleDelete: Function;
}

ListSubject.defaultProps = {
  listSubject: [],
  handleDelete: null,
};
export default function ListSubject({ handleDelete, listSubject }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/bomon/update/${id}`);
  };
  return (
    <>
      <table className="datatables-basic table">
        <thead>
          <tr>
            <th className="text-left">STT</th>
            <th className="text-left">Tên bộ môn</th>
            <th className="text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listSubject.map((item: Subject, index: number) => (
            <tr key={item.id}>
              <td className="text-left">{index + 1}</td>
              <td className="text-left">{item?.name}</td>
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
