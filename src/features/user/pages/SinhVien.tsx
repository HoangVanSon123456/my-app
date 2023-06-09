import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "services/UserService";
import User from "types/User";
import ModalConfirm from "components/layout/ModalConfirm";
import ListUserStudent from "../components/ListUserStudent";
import SearchStudentForm from "../components/SearchStudentForm";

export default function SinhVien() {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);

  const handleClickOpen = () => {
    navigate("/userStudent/create");
  };

  useEffect(() => {
    getListUsers();
  }, []);

  const getListUsers = async () => {
    await UserService.getListStrudent()
      .then((res) => {
        setListUsers(res);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = async (keyword: string) => {
    await UserService.searchUser(keyword)
      .then((res) => {
        setListUsers(res);
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    getListUsers();
  };

  const handleDelete = async (id: number) => {
    if (id > 0) {
      setShow(true);
      setItemId(id);
    }
  };

  const deleteItem = async () => {
    if (itemId > 0) {
      await UserService.deleteItem(itemId)
        .then(() => getListUsers())
        .catch((err) => console.log(err));
      setShow(false);
      // setItemId(0);
    }
  };
  return (
    <>
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              <h2 className="content-header-title float-start mb-0">
                Sinh Viên
              </h2>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/SinhVien">Sinh Viên</a>
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
              Thêm Sinh Viên
            </button>
          </div>
        </div>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="col-12">
            <SearchStudentForm
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
            <div className="card">
              <ListUserStudent
                listUsers={listUsers}
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
