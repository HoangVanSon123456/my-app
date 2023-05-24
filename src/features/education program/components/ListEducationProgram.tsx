import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EducationProgram from "types/EducationProgram";
import { Edit, Trash } from "react-feather";
interface IProps {
  listEducationProgram: EducationProgram[];
  handleDelete: Function;
}

ListNotification.defaultProps = {
  listEducationProgram: [],
  handleDelete: null,
};

export default function ListNotification({
  listEducationProgram,
  handleDelete,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleEditItem = (id: number) => {
    setAnchorEl(null);
    navigate(`/educationProgram/update/${id}`);
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
                    <th>Mã Đào Tạo</th>
                    <th>Mã Học Phần</th>
                    <th>Tên Học Phần</th>
                    <th>Số Tín Chỉ</th>
                    <th>Số Tiết Lý Thuyết</th>
                    <th>Số Tiết Thực Hành</th>
                    <th>Học Kỳ</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {listEducationProgram.map(
                    (item: EducationProgram, index: number) => (
                      <tr key={item.id}>
                        <td>{item?.id}</td>
                        <td>{item?.courseCode}</td>
                        <td>{item?.courseName}</td>
                        <td>{item?.creditName}</td>
                        <td>{item?.theoryClass}</td>
                        <td>{item?.practicalClass}</td>
                        <td>{item?.semester}</td>
                        <td className="text-left">
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
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
