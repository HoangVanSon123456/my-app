import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StudyScore from "types/StudyScore";
import { Edit, Trash } from "react-feather";
interface IProps {
  listStudyScore: StudyScore[];
  handleDelete: Function;
}

ListStudyScore.defaultProps = {
  listStudyScore: [],
  handleDelete: null,
};

export default function ListStudyScore({
  listStudyScore,
  handleDelete,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/studyscore/update/${id}`);
  };
  return (
    <>
      <table className="datatables-basic table">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            {/* <th className="text-center">Mã Học Phần</th> */}
            <th className="text-center">Tên sinh viên</th>
            {/* <th className="text-center">Tín chỉ</th> */}
            <th className="text-center">Số lần học</th>
            <th className="text-center">Đánh giá</th>
            <th className="text-center">Điểm quá trình</th>
            <th className="text-center">Điểm thi</th>
            <th className="text-center">Điểm Tổng kết</th>
            <th className="text-center">Điểm chữ</th>
            <th className="text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {listStudyScore.map((item: StudyScore, index: number) => (
            <tr key={item.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{item?.userName}</td>
              <td className="text-center">{item?.studyTimes}</td>
              <td className="text-center">{item?.evaluate}</td>
              <td className="text-center">{item?.processPoint}</td>
              <td className="text-center">{item?.testScore}</td>
              <td className="text-center">{item?.endPoint}</td>
              <td className="text-center">{item?.letterPoint}</td>
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
    </>
  );
}
