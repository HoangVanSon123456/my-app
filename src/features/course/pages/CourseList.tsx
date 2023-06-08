import ListCourse from "../components/ListCourse";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Course from "types/Course";
import courseService from "services/CourseService";
import ModalConfirm from "components/layout/ModalConfirm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchCourseForm from "../components/SearchCourseFrom";

export default function CourseList() {
  const [listCourse, setCoulistCourseList] = useState<Course[]>([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    getList();
  }, []);

  const handleClickOpen = () => {
    navigate("/hocphan/create");
  };

  const getList = async () => {
    const response = await courseService.getList();
    if (response.status === 200) {
      const items = response.data;
      setCoulistCourseList(items);
      // toast(response.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (id > 0) {
      setShow(true);
      setItemId(id);
    }
  };

  const handleSearch = async (keyword: string) => {
    await courseService
      .searchCourse(keyword)
      .then((res) => {
        setCoulistCourseList(res);
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    getList();
  };

  const deleteItem = async () => {
    if (itemId > 0) {
      await courseService
        .deleteItem(itemId)
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
            <SearchCourseForm
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
            <div className="card">
              <ListCourse listCourse={listCourse} handleDelete={handleDelete} />
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
      <ToastContainer autoClose={2000} />
    </>
  );
}
