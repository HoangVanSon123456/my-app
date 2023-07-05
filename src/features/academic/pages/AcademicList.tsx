import ModalConfirm from "components/layout/ModalConfirm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AcademicService from "services/AcademicService";
import Academic from "types/Academic";
import ListAcademic from "../components/ListAcademic";
import SearchAcademicForm from "../components/SearchAcademicForm";

export default function AcademicList() {
  const [listAcademic, setAcademicList] = useState<Academic[]>([]);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);

  const handleClickOpen = () => {
    navigate("/hocvu/create");
  };

  useEffect(() => {
    getAcademic();
  }, []);

  const getAcademic = async () => {
    await AcademicService.getList()
      .then((res) => {
        setAcademicList(res);
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
      await AcademicService.deleteItem(itemId)
        .then(() => getAcademic())
        .catch((err) => console.log(err));
      setShow(false);
    }
  };

  const handleSearch = async (keyword: string) => {
    await AcademicService.searchAcademic(keyword)
      .then((res) => {
        console.log(res);
        setAcademicList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    getAcademic();
  };
  return (
    <>
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              <h2 className="content-header-title float-start mb-0">Học vụ</h2>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/hocvu">Học vụ</a>
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
              Thêm học vụ
            </button>
          </div>
        </div>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="col-12">
            <SearchAcademicForm
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
            <div className="card">
              <ListAcademic
                listAcademic={listAcademic}
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
