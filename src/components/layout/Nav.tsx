export default function Nav() {
  return (
    <>
      <div className="main-menu-content">
        <ul
          className="navigation navigation-main"
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
          <li className="navigation-header">
            <span data-i18n="Apps & Pages">Apps &amp; Pages</span>
            <i data-feather="more-horizontal" />
          </li>
          <li className="nav-item">
            <a className="" href="/GiaoVien">
              <span className="menu-title text-truncate" data-i18n="user">
                Giáo Viên
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="" href="/SinhVien">
              <span className="menu-title text-truncate" data-i18n="user">
                Sinh Viên
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="" href="/lophocphan">
              <span
                className="menu-title text-truncate"
                data-i18n="notification"
              >
                Lớp học phần
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="" href="/ThongBao">
              <span
                className="menu-title text-truncate"
                data-i18n="notification"
              >
                Thông Báo
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="" href="/hocphan">
              <span
                className="menu-title text-truncate"
                data-i18n="notification"
              >
                Học Phần
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="" href="/chuongtrinhdaotao">
              <span
                className="menu-title text-truncate"
                data-i18n="notification"
              >
                Chương trình đào tạo
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="" href="/hocphi">
              <span
                className="menu-title text-truncate"
                data-i18n="notification"
              >
                Học Phí
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="" href="/bomon">
              <span
                className="menu-title text-truncate"
                data-i18n="notification"
              >
                Bộ môn
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="" href="/chucdanh">
              <span
                className="menu-title text-truncate"
                data-i18n="notification"
              >
                Chức Danh
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="" href="/lichthi">
              <span
                className="menu-title text-truncate"
                data-i18n="notification"
              >
                Lịch thi
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="" href="/hocvu">
              <span
                className="menu-title text-truncate"
                data-i18n="notification"
              >
                Học vụ
              </span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
