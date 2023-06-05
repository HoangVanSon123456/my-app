import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "services/UserService";
import User from "types/User";
import ListSectionClassStudent from "../components/ListSectionClassStudent";
import ModalConfirm from "components/layout/ModalConfirm";
import SearchGiaoVien from "features/user/components/SearchUserForm";

export default function SectionClassStudentList() {
  const [listUsers, setListUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { sectionClassId } = useParams();
  const [show, setShow] = useState(false);
  const handleDelete = async (id: number) => {
    // if (id > 0) {
    //   setShow(true);
    //   setItemId(id);
    // }
  };

  useEffect(() => {
    if (sectionClassId) {
      getStudentSectionClass(+sectionClassId);
    }
  }, [sectionClassId]);

  const getStudentSectionClass = async (sectionClassId: number) => {
    await UserService.getStudentBySectionClass(sectionClassId)
      .then((res) => {
        setListUsers(res);
        localStorage.setItem("sectionClassId", String(sectionClassId));
      })
      .catch((err) => console.log(err));
  };

  const deleteItem = async () => {
    // if (itemId > 0) {
    //   await UserService.deleteItem(itemId)
    //     .then(() => getListUsers())
    //     .catch((err) => console.log(err));
    //   setShow(false);
    // setItemId(0);
  };

  const handleClickOpen = () => {
    navigate("/lophocphan/createStudent");
  };

  const handleSearch = async (keyword: string) => {
    await UserService.searchUser(keyword)
      .then((res) => {
        setListUsers(res);
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    if (sectionClassId) {
      getStudentSectionClass(+sectionClassId);
    }
  };

  return (
    <>
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              <h2 className="content-header-title float-start mb-0">
                Lớp Học Phần
              </h2>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/lophocphan">Lớp Học Phần</a>
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
              Thêm học sinh
            </button>
          </div>
        </div>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="col-12">
            <SearchGiaoVien
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
            <div className="card">
              <ListSectionClassStudent
                listUsers={listUsers}
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
