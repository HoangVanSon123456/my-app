import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyScore from "types/StudyScore";
import ListStudyScore from "../components/ListStudyScore";
import SearchStudyScore from "../components/SearchStudyScore";
import StudyScoreService from "services/StudyScoreService";
import ModalConfirm from "components/layout/ModalConfirm";
import CourseService from "services/CourseService";

export default function StudyScoreList() {
  const [listStudyScore, setStudyScoreList] = useState<StudyScore[]>([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    getList();
  }, []);

  const handleClickOpen = () => {
    navigate("/studyscore/create");
  };

  const getList = async () => {
    await StudyScoreService.getList()
      .then((res) => {
        setStudyScoreList(res);
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
      await StudyScoreService.deleteItem(itemId)
        .then(() => getList())
        .catch((err) => console.log(err));
      setShow(false);
    }
  };

  const handleSearch = async (keyword: string) => {
    await CourseService.searchCourse(keyword)
      .then((res) => {
        setStudyScoreList(res);
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
                Điểm Học Phần
              </h2>
              <div className="breadcrumb-wrapper">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Trang chủ</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/lophocphan">Điểm Học Phần</a>
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
            <SearchStudyScore
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
            <div className="card">
              <ListStudyScore
                listStudyScore={listStudyScore}
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
