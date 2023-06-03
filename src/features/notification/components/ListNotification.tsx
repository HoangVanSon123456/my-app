import Notification from "types/Notification";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Edit, Eye, Trash } from "react-feather";
interface IProps {
  listNotification: Notification[];
  handleDelete: Function;
}

ListNotification.defaultProps = {
  listNotification: [],
  handleDelete: null,
};

export default function ListNotification({
  listNotification,
  handleDelete,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/notification/update/${id}`);
    console.log(id);
  };
  return (
    <>
      <table className="datatables-basic table">
        <thead>
          <tr>
            <th className="text-center">Mã Thông Báo</th>
            <th className="text-center">Tiêu đề</th>
            <th className="text-center">Người dùng</th>
            <th className="text-center">Tệp</th>
            <th className="text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listNotification.map((item: Notification, index: number) => (
            <tr key={item.id}>
              <td className="text-center">{item?.id}</td>
              <td className="text-center">{item?.title}</td>
              <td className="text-center">{item?.userName}</td>
              <td className="text-center">{item?.files}</td>
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
                  <button
                    type="button"
                    className="btn btn-outline-warning btn-sm"
                    // onClick={() => handleEditItem(item.id!)}
                  >
                    <Eye size={16} />
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
