import Header from "components/layout/Header";
import { AUTH_KEYS } from "configs/auth";
import { getLocalStorage } from "configs/localStorage";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const isLogin = Boolean(getLocalStorage(AUTH_KEYS.ACCESS_TOKEN));
  if (isLogin) {
    return (
      <>
        <Header />
        <div className="app-content content ">
          <div className="content-overlay" />
          <div className="header-navbar-shadow" />
          <div className="content-wrapper container-xxl p-0">{children}</div>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
  return <Navigate to="/" state={{ from: location }} />;
}
