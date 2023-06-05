import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationService from "services/NotificationService";
import Notification from "types/Notification";
import ListNotification from "../components/ListNotification";
import ModalConfirm from "components/layout/ModalConfirm";
import SearchNotificationForm from "../components/SearchNotificationForm";

export default function NotificationList() {
  const [listNotification, setNotificationList] = useState<Notification[]>([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);
  useEffect(() => {
    getList();
  }, []);

  const handleClickOpen = () => {
    navigate("/notification/create");
  };

  const getList = async () => {
    await NotificationService.getList()
      .then((res) => {
        setNotificationList(res);
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
      await NotificationService.deleteItem(itemId)
        .then(() => getList())
        .catch((err) => console.log(err));
      setShow(false);
      // setItemId(0);
    }
  };

  const handleSearch = async (keyword: string) => {
    await NotificationService.searchNotification(keyword)
      .then((res) => {
        setNotificationList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    getList();
  };
  return (
    <>
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              <h2 className="content-header-title float-start mb-0">
                Học Phần
              </h2>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/course">Học phần</a>
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
              Thêm học phần
            </button>
          </div>
        </div>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="col-12">
            <SearchNotificationForm
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
            <div className="card">
              <ListNotification
                listNotification={listNotification}
                handleDelete={handleDelete}
              />
            </div>
          </div>
          <ModalConfirm
            show={show}
            text="Bạn thực sự muốn xoá đối tượng này?"
            changeShow={(s: boolean) => setShow(s)}
            submitAction={deleteItem}
          />
        </div>
      </div>
    </>
  );
}
