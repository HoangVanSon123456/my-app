import React, { Suspense } from "react";
import { PrivateRoute } from "components/common/PrivateRoute";
import GiaoVien from "features/user/pages/GiaoVien";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "redux/store";

const ThemUser = React.lazy(() => import("features/user/pages/ThemUser"));
const EditUser = React.lazy(() => import("features/user/pages/EditUser"));
const LoginPage = React.lazy(() => import("features/auth/pages/LoginPage"));
const AuthPage = React.lazy(() => import("features/auth/pages/AuthPage"));

export default function RouterView() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />}>
            <Route index element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            {/* <Route path="forgot" element={<ForgotPage />} />
              <Route path="change-password" element={<ChangePassPage />} /> */}
          </Route>
          <Route
            path="/GiaoVien"
            element={
              <PrivateRoute>
                <Suspense>
                  <GiaoVien />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/GiaoVien/create"
            element={
              <PrivateRoute>
                <Suspense>
                  <ThemUser />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/GiaoVien/update/:id"
            element={
              <PrivateRoute>
                <Suspense>
                  <EditUser />
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      ;
    </Provider>
  );
}
