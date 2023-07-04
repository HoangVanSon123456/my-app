import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TuitionService from "services/TuitionService";
import Tuition from "types/Tuition";

export default function TuitionUser() {
  const [listTuition, setTuitionList] = useState<Tuition[]>([]);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getListTuition(+id);
    }
  }, []);

  const getListTuition = async (id: number) => {
    await TuitionService.getTuitionUser(id)
      .then((res) => {
        setTuitionList(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              <h2 className="content-header-title float-start mb-0">
                Sinh viên
              </h2>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/sinhvien">Sinh viên</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <table className="datatables-basic table">
                <thead>
                  <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Mã Sinh Viên</th>
                    <th className="text-center">Tên Sinh Viên</th>
                    <th className="text-center">Loại học phí</th>
                    <th className="text-center">Học kỳ</th>
                    <th className="text-center">Trạng thái</th>
                    <th className="text-center">Thành tiền</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
