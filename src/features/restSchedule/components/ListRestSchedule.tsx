import { useState } from "react";
import { Edit, Eye, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import RestSchedule from "types/RestSchedule";

interface IProps {
  listRestSchedule: RestSchedule[];
  handleDelete: Function;
}

ListRestSchedule.defaultProps = {
  listAcademic: [],
  handleDelete: null,
};
export default function ListRestSchedule({
  listRestSchedule,
  handleDelete,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/lichthi/update/${id}`);
  };

  const handleItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/lichthi/${id}`);
  };
  return (
    <>
      <table className="datatables-basic table">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên đợt thi</th>
            <th className="text-center">Mã sinh viên</th>
            <th className="text-center">Tên sinh viên</th>
            <th className="text-center">Tên học phần</th>
            <th className="text-center">Tín chỉ</th>
            {/* <th className="text-center">Ngày thi</th>
            <th className="text-center">Ca thi</th>
            <th className="text-center">Giờ thi thi</th>
            <th className="text-center">Số báo danh</th>
            <th className="text-center">Phòng thi</th> */}
            <th className="text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listRestSchedule.map((item: RestSchedule, index: number) => (
            <tr key={item.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{item.name}</td>
              <td className="text-center">{item.userCode}</td>
              <td className="text-center">{item.userName}</td>
              <td className="text-center">{item.courseName}</td>
              <td className="text-center">{item.creditName}</td>
              {/* <td className="text-center">{item.testDay}</td>
              <td className="text-center">{item.poetry}</td>
              <td className="text-center">{item.examTime}</td>
              <td className="text-center">{item.identificatioNumber}</td>
              <td className="text-center">{item.examinationRoom}</td> */}
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
                    onClick={() => handleItem(item.id!)}
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
