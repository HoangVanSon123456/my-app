import { useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
  useLayoutEffect(() => {
    document.body.classList.add("blank-page");
  }, []);
  return (
    <div className="app-content content">
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <div className="content-wrapper">
        <div className="content-header row"></div>
        <div className="content-body">
          <div className="auth-wrapper auth-cover">
            <div className="auth-inner row m-0">
              <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
                <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                  <img
                    className="img-fluid"
                    src="/assets/images/pages/login-v2.svg"
                    alt="Login V2"
                  />
                </div>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
