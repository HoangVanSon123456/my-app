import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tuition from "types/Tuition";
import ListTuition from "../components/ListTuition";
import TuitionService from "services/TuitionService";
import ModalConfirm from "components/layout/ModalConfirm";
import SearchTuitionForm from "../components/SearchTuitionForm";

export default function TuitionList() {
  const [listTuition, setTuitionList] = useState<Tuition[]>([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    getList();
  }, []);

  const handleClickOpen = () => {
    navigate("/hocphi/create");
  };

  const getList = async () => {
    await TuitionService.getList()
      .then((res) => {
        setTuitionList(res);
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
      await TuitionService.deleteItem(itemId)
        .then(() => getList())
        .catch((err) => console.log(err));
      setShow(false);
    }
  };

  const handleSearch = async (keyword: string) => {
    await TuitionService.searchTuition(keyword)
      .then((res) => {
        setTuitionList(res);
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
              <h2 className="content-header-title float-start mb-0">Học phí</h2>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/lophocphan">Học phí</a>
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
          <SearchTuitionForm
            handleSearch={handleSearch}
            handleReset={handleReset}
          />
          <div className="col-12">
            <div className="card">
              <ListTuition
                listTuition={listTuition}
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
