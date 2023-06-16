import { Archive, Mail, User } from "react-feather";
import Nav from "./Nav";
import { Dropdown } from "react-bootstrap";
import AuthService from "services/AuthService";
import { useNavigate } from "react-router-dom";
import UserService from "services/UserService";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await AuthService.logout().then(() => {
      navigate("/");
    });
  };

  const handleGetProfile = async () => {
    await UserService.getUserToken().then((res) => {
      navigate(`/user/getProfile/${res}`);
    });
  };

  const handleForgotPassword = () => {
    navigate("/doimatkhau");
  };
  return (
    <>
      <div>
        <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow container-xxl">
          <div className="navbar-container d-flex content">
            <div className="bookmark-wrapper d-flex align-items-center">
              <ul className="nav navbar-nav d-xl-none">
                <li className="nav-item">
                  <a className="nav-link menu-toggle" href="#">
                    <i className="ficon" data-feather="menu" />
                  </a>
                </li>
              </ul>
              <ul className="nav navbar-nav bookmark-icons">
                <li className="nav-item d-none d-lg-block">
                  <a
                    className="nav-link"
                    href="app-email.html"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Email"
                  >
                    <i className="ficon" data-feather="mail" />
                  </a>
                </li>
                <li className="nav-item d-none d-lg-block">
                  <a
                    className="nav-link"
                    href="app-chat.html"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Chat"
                  >
                    <i className="ficon" data-feather="message-square" />
                  </a>
                </li>
                <li className="nav-item d-none d-lg-block">
                  <a
                    className="nav-link"
                    href="app-calendar.html"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Calendar"
                  >
                    <i className="ficon" data-feather="calendar" />
                  </a>
                </li>
                <li className="nav-item d-none d-lg-block">
                  <a
                    className="nav-link"
                    href="app-todo.html"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Todo"
                  >
                    <i className="ficon" data-feather="check-square" />
                  </a>
                </li>
              </ul>
              <ul className="nav navbar-nav">
                <li className="nav-item d-none d-lg-block">
                  <a className="nav-link bookmark-star">
                    <i className="ficon text-warning" data-feather="star" />
                  </a>
                  <div className="bookmark-input search-input">
                    <div className="bookmark-input-icon">
                      <i data-feather="search" />
                    </div>
                    <input
                      className="form-control input"
                      type="text"
                      placeholder="Bookmark"
                      tabIndex={0}
                      data-search="search"
                    />
                    <ul className="search-list search-list-bookmark" />
                  </div>
                </li>
              </ul>
            </div>
            <div style={{ display: "block", marginLeft: "950px" }}>
              <Dropdown>
                <Dropdown.Toggle variant="success">
                  <User />
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ marginTop: "20px" }}>
                  <Dropdown.Item onClick={handleGetProfile}>
                    Trang cá nhân
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleForgotPassword}>
                    Đổi mật khẩu
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </nav>
      </div>
      <div
        className="main-menu menu-fixed menu-light menu-accordion menu-shadow"
        data-scroll-to-active="true"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item me-auto">
              <a className="navbar-brand" href="/GiaoVien">
                <h2 className="brand-text ms-1">Quản Lý Điểm</h2>
              </a>
            </li>
            <li className="nav-item nav-toggle">
              <a
                className="nav-link modern-nav-toggle pe-0"
                data-bs-toggle="collapse"
              >
                <i
                  className="d-block d-xl-none text-primary toggle-icon font-medium-4"
                  data-feather="x"
                />
                <i
                  className="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary"
                  data-feather="disc"
                  data-ticon="disc"
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="shadow-bottom" />
        <Nav />
      </div>
    </>
  );
}
