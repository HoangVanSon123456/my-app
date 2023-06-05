import { useNavigate } from "react-router-dom";
import SearchSectionClassForm from "../components/SearchSectionClassForm";
import { useEffect, useState } from "react";
import SectionClass from "types/SectionClass";
import SectionClassService from "services/SectionClassService";
import ListSectionClass from "../components/ListSectionClass";
import ModalConfirm from "components/layout/ModalConfirm";

export default function SectionClassList() {
  const [sectionClassList, searchSectionClassList] = useState<SectionClass[]>(
    []
  );
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);
  useEffect(() => {
    getList();
  }, []);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    navigate("/lophocphan/create");
  };

  const handleSearch = async (keyword: string) => {
    await SectionClassService.searchSectionClass(keyword)
      .then((res) => {
        searchSectionClassList(res);
      })
      .catch((err) => console.log(err));
  };

  const getList = async () => {
    await SectionClassService.getList()
      .then((res) => {
        searchSectionClassList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    getList();
  };

  const handleDelete = async (id: number) => {
    if (id > 0) {
      setShow(true);
      setItemId(id);
    }
  };

  const deleteItem = async () => {
    if (itemId > 0) {
      await SectionClassService.deleteItem(itemId)
        .then(() => getList())
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
              Thêm học phần
            </button>
          </div>
        </div>
      </div>
      <div className="content-body">
        <div className="row">
          <div className="col-12">
            <SearchSectionClassForm
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
            <div className="card">
              <ListSectionClass
                sectionClassList={sectionClassList}
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
