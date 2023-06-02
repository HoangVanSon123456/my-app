import { Archive, Mail, User } from "react-feather";
import Nav from "./Nav";
import { Dropdown } from "react-bootstrap";
import AuthService from "services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await AuthService.logout().then(() => {
      navigate("/");
    });
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
            {/* <ul className="nav navbar-nav align-items-center ms-auto">
              <li className="nav-item dropdown dropdown-user">
                <a
                  className="nav-link dropdown-toggle dropdown-user-link"
                  id="dropdown-user"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className="user-nav d-sm-flex d-none">
                    <span className="user-name fw-bolder">John Doe</span>
                    <span className="user-status">Admin</span>
                  </div>
                  <span className="avatar">
                    <img
                      className="round"
                      src="../../../app-assets/images/portrait/small/avatar-s-11.jpg"
                      alt="avatar"
                      height={40}
                      width={40}
                    />
                    <span className="avatar-status-online" />
                  </span>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdown-user"
                >
                  <a className="dropdown-item" href="page-profile.html">
                    <i className="me-50" data-feather="user" /> Profile
                  </a>
                  <a className="dropdown-item" href="auth-login-cover.html">
                    <i className="me-50" data-feather="power" /> Logout
                  </a>
                </div>
              </li>
            </ul> */}
            <div style={{ display: "block", marginLeft: "950px" }}>
              <Dropdown>
                <Dropdown.Toggle variant="success">
                  <User />
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ marginTop: "20px" }}>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
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
