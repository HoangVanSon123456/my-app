import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "services/UserService";
import ListSectionClassStudent from "../components/ListSectionClassStudent";
import ModalConfirm from "components/layout/ModalConfirm";
import SearchGiaoVien from "features/user/components/SearchStudentForm";
import StudyScoreService from "services/StudyScoreService";
import StudyScore from "types/StudyScore";
import SearchStudentForm from "features/user/components/SearchStudentForm";
import TuitionService from "services/TuitionService";
import SearchSectionClassStudentForm from "../components/SearchSectionClassStudentForm";
import SectionClassService from "services/SectionClassService";

export default function SectionClassStudentList() {
  const [listStudyScore, setStudyScoreList] = useState<StudyScore[]>([]);
  const navigate = useNavigate();
  const { sectionScoreId } = useParams();
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);

  const handleDelete = async (id: number) => {
    if (id > 0) {
      setShow(true);
      setItemId(id);
    }
  };

  useEffect(() => {
    if (sectionScoreId) {
      getStudentSectionClass();
    }
  }, [sectionScoreId]);

  const getStudentSectionClass = async () => {
    await StudyScoreService.getStudyScoreBySectionClass(+sectionScoreId!)
      .then((res) => {
        setStudyScoreList(res);
        localStorage.setItem("sectionScoreId", String(sectionScoreId));
      })
      .catch((err) => console.log(err));
  };

  const deleteItem = async () => {
    if (itemId > 0) {
      await StudyScoreService.deleteItem(itemId)
        .then(() => getStudentSectionClass())
        .catch((err) => console.log(err));
      setShow(false);
      setItemId(0);
    }
  };

  const handleClickOpen = () => {
    navigate("/lophocphan/createStudent");
  };

  const handleSearch = async (keyword: string) => {
    await SectionClassService.searchSectionClass(keyword)
      .then((res) => {
        console.log(res);
        setStudyScoreList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    if (sectionScoreId) {
      getStudentSectionClass();
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
            <SearchSectionClassStudentForm
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
            <div className="card">
              <ListSectionClassStudent
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
