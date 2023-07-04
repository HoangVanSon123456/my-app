import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import restScheduleService from "services/RestScheduleService";
import RestSchedule from "types/RestSchedule";

export default function RestScheduleUser() {
  const [listRestSchedule, setRestScheduleList] = useState<RestSchedule[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getRestSchedule(+id);
    }
  }, []);

  const getRestSchedule = async (id: number) => {
    await restScheduleService
      .getRestScheduleUser(id)
      .then((res) => {
        console.log(res);
        setRestScheduleList(res);
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
                    <th className="text-center">Tên học phần</th>
                    <th className="text-center">Tín chỉ</th>
                    <th className="text-center">Ngày thi</th>
                    <th className="text-center">Ca thi</th>
                    <th className="text-center">Giờ thi thi</th>
                    <th className="text-center">Số báo danh</th>
                    <th className="text-center">Phòng thi</th>
                  </tr>
                </thead>
                <tbody>
                  {listRestSchedule.map((item: RestSchedule, index: number) => (
                    <tr key={item.id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{item.courseName}</td>
                      <td className="text-center">{item.creditName}</td>
                      <td className="text-center">{item.testDay}</td>
                      <td className="text-center">{item.poetry}</td>
                      <td className="text-center">{item.examTime}</td>
                      <td className="text-center">
                        {item.identificatioNumber}
                      </td>
                      <td className="text-center">{item.examinationRoom}</td>
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
