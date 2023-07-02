import ModalConfirm from "components/layout/ModalConfirm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubjectService from "services/SubjectService";
import Subject from "types/Subject";
import ListSubject from "../components/ListSubject";

export default function SubjectList() {
  const [listSubject, setSubjectList] = useState<Subject[]>([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    getList();
  }, []);

  const handleClickOpen = () => {
    navigate("/bomon/create");
  };

  const getList = async () => {
    await SubjectService.getList()
      .then((res) => {
        setSubjectList(res);
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
      await SubjectService.deleteItem(itemId)
        .then(() => getList())
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
              <h2 className="content-header-title float-start mb-0">Bộ môn</h2>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/bomon">Bộ môn</a>
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
              Thêm bộ môn
            </button>
          </div>
        </div>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <ListSubject
                listSubject={listSubject}
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
