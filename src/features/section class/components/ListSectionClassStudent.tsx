import { Edit, Eye, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import StudyScore from "types/StudyScore";
import User from "types/User";
interface IProps {
  listStudyScore: User[];
  handleDelete: Function;
}

ListSectionClassStudent.defaultProps = {
  listStudyScore: [],
  handleDelete: null,
};
export default function ListSectionClassStudent({
  listStudyScore,
  handleDelete,
}: IProps) {
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    navigate(`/lophocphan/updateStudent/${id}`);
  };
  return (
    <>
      <table className="datatables-basic table">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên học sinh</th>
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
