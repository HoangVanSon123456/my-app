import ModalConfirm from "components/layout/ModalConfirm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import restScheduleService from "services/RestScheduleService";
import RestSchedule from "types/RestSchedule";
import ListRestSchedule from "../components/ListRestSchedule";

export default function RestScheduleList() {
  const [listRestSchedule, setRestScheduleList] = useState<RestSchedule[]>([]);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);

  const handleClickOpen = () => {
    navigate("/lichthi/create");
  };

  useEffect(() => {
    getRestSchedule();
  }, []);

  const getRestSchedule = async () => {
    await restScheduleService
      .getList()
      .then((res) => {
        console.log(res);
        setRestScheduleList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id: number) => {
    if (id > 0) {
      setShow(true);
      setItemId(id);
    }
  };

  const deleteItem = async () => {
    if (itemId > 0) {
      await restScheduleService
        .deleteItem(itemId)
        .then(() => getRestSchedule())
        .catch((err) => console.log(err));
      setShow(false);
    }
  };
  return (
    <>
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              <h2 className="content-header-title float-start mb-0">
                Lịch thi
              </h2>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/lichthi">Lịch thi</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="content-header-right text-md-end col-md-3 col-12 d-md-block d-none">
          <div className="mb-1 breadcrumb-right">
            <button
              type="button"
              className="btn btn-primary btn-10px"
              onClick={handleClickOpen}
            >
              Thêm lịch thi
            </button>
          </div>
        </div>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="col-12">
            {/* <SearchTeacherForm
              handleSearch={handleSearch}
              handleReset={handleReset}
            /> */}
            <div className="card">
              <ListRestSchedule
                listRestSchedule={listRestSchedule}
                handleDelete={handleDelete}
              />
            </div>
            <ModalConfirm
              show={show}
              text="Bạn thực sự muốn xoá đối tượng này?"
              changeShow={(s: boolean) => setShow(s)}
              submitAction={deleteItem}
            />
          </div>
        </div>
      </div>
    </>
  );
}
