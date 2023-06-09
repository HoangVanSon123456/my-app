import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tuition from "types/Tuition";
import { Edit, Trash } from "react-feather";

interface IProps {
  listTuition: Tuition[];
  handleDelete: Function;
}

ListTuition.defaultProps = {
  listTuition: [],
  handleDelete: null,
};

export default function ListTuition({ listTuition, handleDelete }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/hocphi/update/${id}`);
    console.log(id);
  };

  return (
    <table className="datatables-basic table">
      <thead>
        <tr>
          <th className="text-center">STT</th>
          <th className="text-center">Mã Sinh Viên</th>
          <th className="text-center">Sinh Viên</th>
          <th className="text-center">Loại học phí</th>
          <th className="text-center">Học kỳ</th>
          <th className="text-center">Trạng thái</th>
          <th className="text-center">Thành tiền</th>
          <th className="text-left">Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        {listTuition.map((item: Tuition, index: number) => (
          <tr key={item.id}>
            <td className="text-center">{index + 1}</td>
            <td className="text-center">{item?.userCode}</td>
            <td className="text-center">{item?.userName}</td>
            <td className="text-center">{item?.tuitionType}</td>
            <td className="text-center">{item?.semester}</td>
            <td className="text-center">{item?.status}</td>
            <td className="text-center">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item?.intoMoney!)}
            </td>
            <td>
              <div className="d-flex">
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
  );
}
